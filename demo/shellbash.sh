#! /bin/bash
#set -x

## Check if this is being run as root
if [ $(id --user) -ne 0 ]
	then
		echo "Aborting: workload.sh must be run as root"
		exit
	fi
 
linuxver="3.0"
url=https://www.kernel.org/pub/linux/kernel/v"$linuxver"/incr/
rsyncurl=rsync://rsync.kernel.org/pub/linux/kernel/v"$linuxver"/incr/
patchver=patch-"$linuxver"

checkifpatch()
{
    curl --head --silent --fail --list-only "$url""$patchver"."$current"-"$incremental".gz
    return $?
}

downloadpatch()
{
    rsync --no-motd -uP "$rsyncurl""$patchver"."$current"-"$incremental".gz "$targetdir"/linux 
    return 0
}

## Extracts and patches
applypatch()
{
    gunzip "$targetdir"/linux/"$patchver"."$current"-"$incremental".gz
    patch -p1 < "$targetdir"/linux/"$patchver"."$current"-"$incremental"
    return 0
}

# Displays usage information
usage()
{
        echo "usage: $0 -d /path/to/target"
}

#### Options handling and user interface
while getopts ":hd:" option
do
        case "$option" in
                d)
                        targetdir="$OPTARG"
                        ;;
                h)
                        usage
                        exit 0
                        ;;
                :)
                        echo "target directory for -$OPTARG must be specified"
                        ;;
                ?)
                        echo "workload.sh: unknown option -$OPTARG"
                        usage
                        exit 1
                        ;;
        esac
done

#### Eliminate any trailing slashes in the target argument
targetdir="${targetdir%/}"

if [ -z "$targetdir" ]
then
        echo "workload.sh: specify a target directory with -d"
        usage
        exit 1
fi

if [ ! -d "$targetdir" ]
then
        echo "workload.sh: -d must be a directory and it must already exist"
        exit 1
fi

#### Main logic
pushd "$targetdir"/linux

# Patches for this version tree run from 3.0.4 to 3.0.101
for current in {4..101}; do
    # Use a C-style loop so that a variable can be used/set in the incremental version number
    for (( incremental = current ; incremental <= 101 ; incremental += 1 )); do  
        # Check if the patch exists without cluttering up stdout
        if checkifpatch
        then
            # Download the patch to the source root, unzip, and patch the tree.
            downloadpatch 
            applypatch
            # Break after patching.
            break
        fi
    done    
done

popd

return 0

let cb_save = &clipboard
set clipboard-=unnamed clipboard-=unnamedplus
let reg_save = @@
call setreg('"',"\r",'v')
call s:wrapreg('"',char,"",linemode)
" If line mode is used and the surrounding consists solely of a suffix,
" remove the initial newline.  This fits a use case of mine but is a
" little inconsistent.  Is there anyone that would prefer the simpler
" behavior of just inserting the newline?
if linemode && match(getreg('"'),'^\n\s*\zs.*') == 0
  call setreg('"',matchstr(getreg('"'),'^\n\s*\zs.*'),getregtype('"'))
endif
" This can be used to append a placeholder to the end
if exists("g:surround_insert_tail")
  call setreg('"',g:surround_insert_tail,"a".getregtype('"'))
endif
if &ve != 'all' && col('.') >= col('$')
  if &ve == 'insert'
    let extra_cols = virtcol('.') - virtcol('$')
    if extra_cols > 0
      let [regval,regtype] = [getreg('"',1,1),getregtype('"')]
      call setreg('"',join(map(range(extra_cols),'" "'),''),'v')
      norm! ""p
      call setreg('"',regval,regtype)
    endif
  endif
  norm! ""p
else
  norm! ""P
endif

function! s:closematch(str) " {{{1
  " Close an open (, {, [, or < on the command line.
  let tail = matchstr(a:str,'.[^\[\](){}<>]*$')
  if tail =~ '^\[.\+'
    return "]"
  elseif tail =~ '^(.\+'
    return ")"
  elseif tail =~ '^{.\+'
    return "}"
  elseif tail =~ '^<.+'
    return ">"
  else
    return ""
  endif
endfunction " }}}1

nnoremap <silent> <Plug>SurroundRepeat .
nnoremap <silent> <Plug>Dsurround  :<C-U>call <SID>dosurround(<SID>inputtarget())<CR>
nnoremap <silent> <Plug>Csurround  :<C-U>call <SID>changesurround()<CR>
nnoremap <expr>   <Plug>Yssurround '^'.v:count1.<SID>opfunc('setup').'g_'
nnoremap <expr>   <Plug>YSsurround <SID>opfunc2('setup').'_'
vnoremap <silent> <Plug>VSurround  :<C-U>call <SID>opfunc(visualmode(),visualmode() ==# 'V' ? 1 : 0)<CR>
inoremap <silent> <Plug>ISurround  <C-R>=<SID>insert(1)<CR>

if !exists("g:surround_no_mappings") || ! g:surround_no_mappings
  nmap ds  <Plug>Dsurround
  xmap gS  <Plug>VgSurround
  if !exists("g:surround_no_insert_mappings") || ! g:surround_no_insert_mappings
    if !hasmapto("<Plug>Isurround","i") && "" == mapcheck("<C-S>","i")
      imap    <C-S> <Plug>Isurround
    endif
    imap      <C-G>s <Plug>Isurround
    imap      <C-G>S <Plug>ISurround
  endif
endif

" vim:set ft=vim sw=2 sts=2 et:
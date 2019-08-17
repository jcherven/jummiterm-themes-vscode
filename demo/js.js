// https://api.giphy.com/v1/gifs/search?api_key=DGO8o3GLH8FdLjs2Orr9XM48VgDnHxf9&limit=5&q=lemur
const apiKey = 'DGO8o3GLH8FdLjs2Orr9XM48VgDnHxf9';
const searchResultLimit = 30;

// jquery DOM objects
$addTopicButton = $('#add-topic-button');
$searchBar = $('#add-topic-searchbar');
$contentArea = $('#gif-grid');
$gifItem = $('.gif');

$('document').ready(function() {
    // listen for an enter keypress and treat it like a button click for adding a gif topic
    $searchBar.keypress(function(event) {
        if(event.which == 13) {
            $addTopicButton.click();
        }
    })

    // When a topic search term is added, handle the Giphy API call
    $addTopicButton.on('click', function() {
        var $searchTerm = $searchBar.val().trim();
        var queryUrl = 'https://api.giphy.com/v1/gifs/search?api_key=' + apiKey + '&limit=' + searchResultLimit + '&q=' + $searchTerm;

        // clear the user's search term after entering
        $searchBar.val('');
    
        $.ajax({
        url: queryUrl,
        method: "GET"
        }).then(function(response) {
            // TODO add topic button to the topics area
            var $smushedSearchTerm = $searchTerm.replace(/\s+/, '-');
            var $newTopicMarker = $('<div>');
            var $markerMinusButton = $('<button>');
            var $markerGotoButton = $('<button>');

            $newTopicMarker.attr('id', $smushedSearchTerm);
            $newTopicMarker.addClass('btn-group btn-group-sm m-1');
            $newTopicMarker.attr('role', 'group');
            $newTopicMarker.append($markerMinusButton);
            $markerMinusButton.attr('type', 'button');
            $markerMinusButton.addClass('btn btn-dark');
            $markerMinusButton.text('-');
            $newTopicMarker.append($markerGotoButton);
            $markerGotoButton.attr('type', 'button');
            $markerGotoButton.addClass('btn btn-outline');
            $markerGotoButton.text($searchTerm);

            $('#topics').append($newTopicMarker);

            var responseObj = response.data;

            // Step through responseObj, create img tags for each gif, and present them in $contentArea
            for ( var key in responseObj ) {
                var stillUrl = responseObj[key].images.fixed_height_small_still.url;
                var $responseImage = $('<img>');
                $responseImage.addClass($searchTerm);
                $responseImage.addClass('gif');
                $responseImage.attr('data-state', 'still');
                $responseImage.attr('data-still', responseObj[key].images.fixed_height_small_still.url);
                $responseImage.attr('data-animate', responseObj[key].images.fixed_height_small.url);
                $responseImage.attr('src', stillUrl);

                $('#gif-grid').prepend($responseImage);
            } // End for(key in response.data)
        }); // End AJAX call
    }) // End $addTopicButton.on(click...)

}); // End $(document).ready()

// When a gif is clicked, toggle between animated and still
$(document).on('click', '.gif', function() {
    if ( $(this).attr('data-state') === 'still' ) {
        $(this).attr('src', $(this).attr('data-animate'));
        $(this).attr('data-state', 'animate');
    }
    else {
        $(this).attr('src', $(this).attr('data-still'));
        $(this).attr('data-state', 'still');
    }
}) // End .on(click...)

// TODO When remove button on a topic marker is clicked, remove gifs from content area


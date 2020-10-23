$(function() {
    const queryString = document.location.search;
    const pramsURL = new URLSearchParams(queryString);
    const bookId =pramsURL.get('id');

    const getBook = async()=>{
        try{
            const response = $.ajax({
                url : `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${config.API_KEY}`,
                type :"GET",
                datatype : "json"
            })
            return response;
        }catch(error){
            console.log(error);
            return error;
        }
    }
    // const sanitizeBookData = (data)  => {
    //     const book = {
    //         id : bookId,
    //         title : data.volumeInfo.title,
    //         author : data.volumeInfo.authors[0],
    //         publisher : data.volumeInfo.publisher,
    //         publishedDate : data.volumeInfo.publishedDate,
    //         description : data.volumeInfo.description,
    //         imageLinks : data.volumeInfo.imageLinks,
    //         buyLink : data.volumeInfo.buyLink,
    //         categories : data.volumeInfo.categories
    //     }
    //     return book;
    // }

    const displayData = (data) => {
        const img = $('<img>').attr('src',data.volumeInfo.imageLinks.thumbnail);
        $(".book-img").append(img);

        const bookTitle = $('<h2 class="book-title"></h2>').text(data.volumeInfo.title);
        $('.book-info').append(bookTitle);

        const bookAuthors = $('<h3 class="book-authors"></h3>').text(data.volumeInfo.authors);
        $('.book-info').append(bookAuthors);

        const bookDesc = $('<p></p>').text(data.volumeInfo.description);
        $('.book-info').append(bookDesc);

        const publisher = $('<p></p>').text(data.volumeInfo.publisher);
        $('.book-info').append(publisher);

        const publishedDate = $('<p></p>').text(data.volumeInfo.publishedDate);
        $('.book-info').append(publishedDate);

        // const ul =$('<ul></ul>');
        // data.volumeInfo.categories.forEach((d)=>{
        //     d.replace("/","-");
        //     const li = $('<li></li>').text(d);
        //     ul.append(li);
        // })
        // $('.book-info').append(ul);



    }
    getBook().then((value)=>{
       displayData(value);
    })
})
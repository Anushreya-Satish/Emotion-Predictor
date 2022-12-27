$(document).ready(function(){
    console.log('Ready')

    let date_time = new Date()
    let current_date = date_time.toLocaleDateString()

    $('#date').text("Date : " + current_date)

    $('#button').click(function(){

        let review = $('#text').val()
        console.log(review)

        let input_data = {'customer_review' : review}
        console.log(input_data)

        $.ajax({

            url : "/predict",
            type : "POST",
            data : JSON.stringify(input_data),
            dataType : 'json',
            contentType : 'application/json',
            success : function(result){
                let prediction = result.prediction
                let emoji_url = result.url
                console.log(emoji_url)

                $('#sentiment').text(prediction)
                $('#sentiment').show()

                $('#emoji').attr('src' , emoji_url)
                $('#emoji').show()
            },
            error : function(result){
                console.log(result)
            }
        })

        $('#text').val("")
        
    })
})
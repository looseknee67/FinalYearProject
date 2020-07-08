$(document).on("click", "#itemId", function (e) {
    e.preventDefault();
    href = $(this).attr('href');
 
     return bootbox.confirm({ 
 
     title: "Sure you want to delete?",
     message: "This cannot be undone...",
     className: 'rubberBand animated',
     
     buttons: {
         cancel: {
             label: 'Cancel <i class="fa fa-times"></i>'
         },
         confirm: {
             label: 'Confirm <i class="fa fa-check"></i>'
         }     
     },
     callback: function (result) {
         if(result){
           window.location = href
         }
     }
 });
 });
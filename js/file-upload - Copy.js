$(document).ready(function(){
	$('input[type=file]').change(function(){
		$(this).simpleUpload("fileupload.php?getFormat=1", {
			allowedExts: ["jpg", "jpeg", "jpe", "jif", "jfif", "jfi", "png", "gif"],
			allowedTypes: ["image/pjpeg", "image/jpeg", "image/png", "image/x-png", "image/gif", "image/x-gif"],
			maxFileSize: 5000000, //5MB in bytes
			start: function(file){
                console.log(file);
				//upload started
				this.block          = $('<div class="block"></div>');
				this.progressBar    = $('<div class="progressBar"></div>');
				this.cancelButton   = $('<div class="cancelButton">x</div>');
				/*
				 * Since "this" differs depending on the function in which it is called,
				 * we need to assign "this" to a local variable to be able to access
				 * this.upload.cancel() inside another function call.
				 */

				var that = this;
				this.cancelButton.click(function(){
					that.upload.cancel();
					//now, the cancel callback will be called
				});
				this.block.append(this.progressBar).append(this.cancelButton);
				$('#uploads').append(this.block);
			},

			progress: function(progress){
				//received progress
				this.progressBar.width(progress + "%");
			},

			success: function(data){
				//upload successful
				this.progressBar.remove();
				this.cancelButton.remove();
				if (data.success) {
					//now fill the block with the format of the uploaded file
					var format = data.message;
					var formatDiv = $('<div class="format"></div>').text(format);
					this.block.append(formatDiv);
                } 
                else {
					//our application returned an error
					var error = data.error.message;
					var errorDiv = $('<div class="error"></div>').text(error);
					this.block.append(errorDiv);
				}
			},
			error: function(error){
				//upload failed
				this.progressBar.remove();
				this.cancelButton.remove();
				var error = error.message;
				var errorDiv = $('<div class="error"></div>').text(error);
				this.block.append(errorDiv);
			},
			cancel: function(){
				//upload cancelled
				this.block.fadeOut(400, function(){
					$(this).remove();
				});
			}
		});
    });
});
$(document).ready(function() {
    /*if (window.File && window.FileList && window.FileReader) {
        $("#files").on("change", function(e) {
            var files = e.target.files;
            var filesLength = files.length;
            for (var i = 0; i < filesLength; i++) {
                var f = files[i];
                console.log(f.type);
                var fileReader = new FileReader();
                    fileReader.onload = (function(e) {
                        var file = e.target;
                        $("<span class=\"pip\">" +
                        "<img class=\"imageThumb\" src=\"" + e.target.result + "\" title=\"" + file.name + "\"/>" +
                        "<br/><span class=\"remove\">Remove image</span>" +
                        "</span>").insertAfter("#files");
                        $(".remove").click(function(){
                            $(this).parent(".pip").remove();
                        });
                    });
                    fileReader.readAsDataURL(f);
            }
        });
    } 
    else {
        alert("Your browser doesn't support to File API")
    }*/

    function FileUpload() {
        var fileInput = document.getElementById('FileUpload1');
        var filePath = fileInput.value;
        var allowedExtensions = /(\.mp4|\.MP4|\.png|\.PNG|\.jpg|\.JPG|\.jpeg|\.JPEG)$/i;
        if(!allowedExtensions.exec(filePath)){
            $('#FileUpload1').addClass('error');
            $('.Mupload + label').text("Please upload .mp4 video or Image files only.");
            fileInput.value = '';
            return false;
        }
        else{                         
            $('.Mupload').attr('disabled', 'disabled');
            var fileUpload = $("#FileUpload1").get(0);
            var files = fileUpload.files;
            var fileData = new FormData();
            for (var i = 0; i < files.length; i++) {
                $(".attachedScreenPrevImages").append("<li class='file-thumbnail column loader'><div class='snap-video-image'><img src='../../Content/images/vector/ajax-loader.gif' /></div></li>");
                fileData.append(files[i].name, files[i]);
            }

            /**** sending ajax request to the server ****/
            /*$.ajax({
                url: '/WeeklyDigestsManual/UploadVideo',
                type: "POST",
                contentType: false, // Not to set any content header  
                processData: false, // Not to process data  
                data: fileData,
                success: function (result) {
                    setTimeout(function(){ 
                        $('.Mupload').removeAttr('disabled', 'disabled');
                        //$(".attachedScreenPrevImages").text("Done.....").removeClass("loading...");
                        location.reload();
                        $(".upload-loader").remove();
                    }, 500);
                },
                error: function (err) {

                }
            });*/
        }
    }
});




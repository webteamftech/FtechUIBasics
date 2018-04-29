$(document).ready(function(){ 
    $('input[type=file]').change(function(){

		$(this).simpleUpload("fileupload.php", {

			start: function(file){
				//upload started
				this.block = $('<div class="block"></div>');
				this.progressBar = $('<div class="progressBar"></div>');
				this.block.append(this.progressBar);
				$('#uploads').append(this.block);
			},

			progress: function(progress){
				//received progress
				this.progressBar.width(progress + "%");
			},

			success: function(data){
				//upload successful

				this.progressBar.remove();

				/*
				 * Just because the success callback is called doesn't mean your
				 * application logic was successful, so check application success.
				 *
				 * Data as returned by the server on...
				 * success:	{"success":true,"format":"..."}
				 * error:	{"success":false,"error":{"code":1,"message":"..."}}
				 */

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
				var error = error.message;
				var errorDiv = $('<div class="error"></div>').text(error);
				this.block.append(errorDiv);
			}

		});

	});
});
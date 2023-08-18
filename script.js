$(document).ready(function() {
	
	$('#dob').on('change', function() {
        calculateAge();
    });
	
    $('#submit-button').click(function() {
        var fullname = $('#fullname').val();
        var email = $('#email').val();
        var mobile = $('#mobile').val();
        var dob = $('#dob').val();
        var age = $('#age').val();
        var gender = $('#gender').val();

		// Validate form fields
        var fullname = $('#fullname').val();
        var email = $('#email').val();
        var mobile = $('#mobile').val();
        var dob = $('#dob').val();
        var age = $('#age').val();
        var gender = $('#gender').val();

        if (!fullname || !email || !mobile || !dob || !age || !gender) {
            $('#result').html("Please fill in all fields.");
            return;
        }else{
			$('#result').html("");
		}
				
		if (!validateName(fullname)) {
            $('#result').html("Invalid name format. Only letters, commas, and periods are allowed.");
            return;
        }else{
			$('#result').html("");
		}
		
        if (!validateEmail(email)) {
            $('#result').html("Invalid email format.");
            return;
        }else{
			$('#result').html("");
		}

        if (!validateMobile(mobile)) {
            $('#result').html("Invalid mobile number format.");
            return;
        }else{
			$('#result').html("");
		}
		
		if (!gender) {
            $('#result').html("Please fill on gender");
            return;
        }else{
			$('#result').html("");
		}
		
        $.ajax({
            type: 'POST',
            url: 'db.php',
            data: {
                fullname: fullname,
                email: email,
                mobile: mobile,
                dob: dob,
                age: age,
                gender: gender
            },
            success: function(response) {
                $('#result').html(response);
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Data successfully saved!',
                    confirmButtonText: 'OK'
                }).then(() => {
                    clearInputs();
                });
            },
			error: function(xhr, status, error) {
                $('#result').html("An error occurred: " + xhr.responseText);
            }
        });
    });
	
	// Name validation function
    function validateName(name) {
        var pattern = /^[a-zA-Z,.\s]+$/;
        return pattern.test(name);
    }
	
	// Email validation function
	function validateEmail(email) {
		var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return pattern.test(email);
	}
	
	// Validate PH mobile number format
	function validateMobile(mobile) {
        var pattern = /^(09|\+639)\d{9}$/;
        return pattern.test(mobile);
    }
	
	// Calculate age based on DOB
    function calculateAge() {
        var dob = new Date($('#dob').val());
        var today = new Date();
        var age = today.getFullYear() - dob.getFullYear();
        
        // Adjust age if birthday hasn't occurred yet this year
        var dobMonth = dob.getMonth();
        var todayMonth = today.getMonth();
        if (todayMonth < dobMonth || (todayMonth === dobMonth && today.getDate() < dob.getDate())) {
            age--;
        }

        $('#age').val(age);
    }
	
	function clearInputs() {
        $('#fullname').val('');
        $('#email').val('');
        $('#mobile').val('');
        $('#dob').val('');
        $('#age').val('');
        $('#gender').val('');
    }
});
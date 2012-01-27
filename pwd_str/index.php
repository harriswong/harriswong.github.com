<html>
	<head>
		<script type="text/javascript" src="http://code.jquery.com/jquery-1.7.1.min.js"></script>
		<script type="text/javascript" src="mustache.js"></script>
		<script type="text/javascript" src="PasswordStrength.js"></script>
		<style type="text/css">
			#pwd_strength_container {
				width: 300px;
			}
			.pwd_strength_bar {
				height: 5px;
			}
			.pwd_strength_red {
				width: 40%;
				background-color: red;
			}
			.pwd_strength_yellow {
				width: 75%;
				background-color: yellow;
			}
			.pwd_strength_green {
				background-color: green;
			}
		</style>
	</head>
	<body>
		<script type="text/javascript">
			$(document).ready(function() {
				PasswordStrength.init();
			});
		</script>
		<h1>an attempt to use mustache</h1>
		<div>
			Test: <input type="text" id="pwd_strength_input" />
			<div id="pwd_strength_container"></div>
		</div>
		<div id="pwd_strength_template_holder" style="display: none;">
			<h3>{{title}}</h3>
			<div class="pwd_strength_bar pwd_strength_{{strength_class}}">
			</div>
			<span>Use at least 8 characters with at least 1 non-alphabete character. Don’t use a password from another site, or something too obvious like your pet's name.</span>
		</div>
	</body>
</html>
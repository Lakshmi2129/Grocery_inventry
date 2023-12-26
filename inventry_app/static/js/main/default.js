
// For Electron MIME eroor
if (typeof module === 'object') {
    window.module = module;
    module = undefined;
  }
  if (window.module) module = window.module;
  
mode = localStorage.getItem("theme");
if (mode == "static/css/main/light.css") {
	var theme_mode = "light";
	var bg_color = "#fff";
	$("#lt_logo").css('background','transparent');
} else if (mode == "static/css/main/dark.css") {
	var theme_mode = "dark";
	var bg_color = "#222B45";
	$("#lt_logo").css('background','#fff');
}
  
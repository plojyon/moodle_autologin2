
function saveOptions(e) {
	e.preventDefault();
	browser.storage.local.set({
		cookie: document.querySelector('#cookie').value,
		uname: document.querySelector('#uname').value,
		pw: document.querySelector('#pw').value,
		use_pw: document.querySelector('#use_pw').checked
	});
}

function loadOptions() {
	document.querySelector("#myform").addEventListener("submit", saveOptions);
	
	browser.storage.local.get('cookie').then((i) => {
		document.querySelector('#cookie').value = i.cookie || '';
	});
	browser.storage.local.get('uname').then((i) => {
		document.querySelector('#uname').value = i.uname || '';
	});
	browser.storage.local.get('pw').then((i) => {
		document.querySelector('#pw').value = i.pw || '';
	});
	browser.storage.local.get('use_pw').then((i) => {
		if (i.use_pw)
			document.querySelector('#use_pw').checked = true;
		else
			document.querySelector('#use_cookie').checked = true;
	});
}
document.addEventListener('DOMContentLoaded', loadOptions);
document.addEventListener('change', saveOptions);
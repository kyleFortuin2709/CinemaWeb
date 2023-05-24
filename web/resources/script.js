document.addEventListener("DOMContentLoaded", function() {
	const navigationPlaceholder = document.getElementById("navigationPlaceholder");
	
	const heading = document.createElement('h2');
	heading.textContent = "CinemaApp";

	// create a ul 
	const ul_list = document.createElement('ul');
	
	// add li about 
	const li_about = document.createElement('li');
	const li_about_a = document.createElement('a');
	// li_about_a.setAttribute('href', 'about.html');
	li_about_a.textContent = 'About';
	li_about.appendChild(li_about_a);
	ul_list.appendChild(li_about);
	
	// add li contact us 
	const li_contact = document.createElement('li');
	const li_contact_a = document.createElement('a');
	// li_contact_a.setAttribute('href', 'contactus.html');
	li_contact_a.textContent = 'Contact Us';
	li_contact.appendChild(li_contact_a);
	ul_list.appendChild(li_contact);

	// add li home
	const li_home = document.createElement('li');
	const li_home_a = document.createElement('a');
	// li_home_a.setAttribute('href', 'indextest.html');
	li_home_a.textContent = 'Home';
	li_home.appendChild(li_home_a);
	ul_list.appendChild(li_home);

	navigationPlaceholder.appendChild(heading);
	navigationPlaceholder.appendChild(ul_list);

    const footer = document.getElementById("footer");

    const footer_p = document.createElement('p');
    footer_p.setAttribute('class', 'material-symbols-outlined');
    footer_p.textContent = 'copyright';
    footer.appendChild(footer_p);
    
    const footer_p_r = document.createElement('p');
    footer_p_r.textContent = '2023';
    footer.appendChild(footer_p_r);


  });
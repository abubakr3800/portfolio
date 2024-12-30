axios.get("manual.json").then(res=>{
    res.data.forEach(user => {
        console.log(user.name);
        document.getElementById('hero-title').innerText = user.name;
        document.getElementById('nav-brand').innerText = user.name;
        document.getElementById('hero-subtitle').innerText = user.title;
        document.getElementById('about-description').innerText = user.objective;
        document.getElementById('personal-image').src = user.image;
        document.getElementById('personal-image').classList.add("w-100");
        document.getElementById('education').innerHTML = "<i class='fa-solid fa-school'></i> Education";
        document.getElementById('work').innerHTML = "<i class='fa-solid fa-briefcase'></i> Work";
        document.getElementById('certifications').innerHTML = '<i class="fa-solid fa-certificate"></i> Certifications';
        document.getElementById('hobbies').innerHTML = "<i class='fa-solid fa-gamepad'></i> Hobbies";
        document.getElementById('volantering').innerHTML = "<i class='fa-solid fa-handshake-angle'></i> Volanteering";
        document.getElementById('skills').innerHTML = "<i class='fa-solid fa-book-skull'></i> Skills";
        document.getElementById('interests').innerHTML = "<i class='fa-regular fa-face-smile'></i> Interrests";
        document.getElementById('experiences').innerHTML = "Experience";

        const portfolioContainer = document.getElementById('portfolio-container');
        user.portofolio.forEach(project => {
            project.images.forEach(image => {
                const item = `
                    <div class="col-md-4 mb-4">
                        <div class="card portfolio-item">
                            <img src="${image}" alt="${project.title}">
                            <div class="card-body">
                                <h5 class="card-title">${project.title}</h5>
                                <p class="card-text">${project.description || ''}</p>
                                <a href="${project.link}" class="btn btn-primary" target="_blank">View Project</a>
                            </div>
                        </div>
                    </div>`;
                portfolioContainer.innerHTML += item;
            })
        });
    }) 
})
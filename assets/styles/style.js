axios.get("manual.json").then(res=>{
    res.data.forEach(user => {
        if (document.URL.indexOf("id") != -1) {
            var id = document.URL.indexOf("&") != -1 ? document.URL.substring(document.URL.indexOf("id"),document.URL.indexOf("&")).split("=")[1] : document.URL.substring(document.URL.indexOf("id"),document.URL.length).split("=")[1] ;
            if (user.id == Number(id)) {
                console.log(user.name);
                let personalModal = new bootstrap.Modal(document.getElementById('personal-modal'));
                function showDetails(key) {
                    const personalData = user["" + key];
    
                    // document.getElementById('stageModalLabel').innerText = stageName;
                    // document.getElementById('modalGoal').innerText = stageData.Goal;
                    // document.getElementById('modalActions').innerHTML = stageData["Key Actions"].map(action => `<li>${action}</li>`).join('');
                    // document.getElementById('modalCourses').innerHTML = stageData["Recommended Courses"].map(course => `<li>${course}</li>`).join('');
                    personalModal.show();
                }
                document.getElementById('hero-title').innerText = user.name;
                document.getElementById('nav-brand').innerText = user.name;
                document.getElementById('hero-subtitle').innerText = user.jobTitle;
                document.getElementById('about-description').innerText = user.objective;
                document.getElementById('personal-image').src = user.image;
                document.getElementById('personal-image').classList.add("w-100");
                document.getElementById('education').innerHTML = "<a id='eduModal' onclick='showDetails(" + '"' +  'education'  + '"' + ")'><i class='fa-solid fa-school'></i> Education</a>";
                document.getElementById('work').innerHTML = "<i class='fa-solid fa-briefcase'></i> Work";
                document.getElementById('certifications').innerHTML = '<i class="fa-solid fa-certificate"></i> Certifications';
                document.getElementById('hobbies').innerHTML = "<i class='fa-solid fa-gamepad'></i> Hobbies";
                document.getElementById('volantering').innerHTML = "<i class='fa-solid fa-handshake-angle'></i> Volanteering";
                document.getElementById('skills').innerHTML = "<i class='fa-solid fa-book-skull'></i> Skills";
                document.getElementById('interests').innerHTML = "<i class='fa-regular fa-face-smile'></i> Interrests";
                document.getElementById('experiences').innerHTML = "<i class='fa-solid fa-book-skull'></i> Experience";

                // document.getElementById("eduModal").onclick = showPersonalDetails(user);
                // showPersonalDetails();

                const portfolioContainer = document.getElementById('portfolio-container');
                user.portfolio.forEach(project => {
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
            }
        }else{
            document.location.href = "404.html"
        }
    }) 
})

// function showPersonalDetails(user) {
//     let personalModal = new bootstrap.Modal(document.getElementById('personal-modal'));
//     // personalData = JSON.parse(user);
//     console.log(user);
    
//     personalModal.show();
// }
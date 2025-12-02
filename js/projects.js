fetch('projects.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        const projectsgrid = document.getElementById('projects-grid');
        
        if (!projectsgrid) {
            console.error('Could not find element with id "projects-grid"');
            return;
        }

        // Filter out incomplete projects
        const validProjects = data.filter(project => 
            project.id != 0 
        );

        if (validProjects.length === 0) {
            projectsgrid.innerHTML = '<p style="text-align: center;">No projects to display yet.</p>';
            return;
        }

        validProjects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.classList.add("project-card");
            projectElement.innerHTML = `
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}">
                    <div class="project-overlay">
                        <a href="${project.liveUrl}" class="project-link" target="_blank" rel="noopener noreferrer">
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                        <a href="${project.githubUrl}" class="project-link" target="_blank" rel="noopener noreferrer">
                            <i class="fab fa-github"></i>
                        </a>
                    </div>
                </div>
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tags">
                        ${project.technologies.filter(tech => tech).map(tech => `<span>${tech}</span>`).join('')}
                    </div>
                </div>`;

            projectsgrid.appendChild(projectElement);
        });

        console.log(`Successfully loaded ${validProjects.length} projects`);
    })
    .catch(error => {
        console.error('Error loading projects:', error);
        const projectsgrid = document.getElementById('projects-grid');
        if (projectsgrid)
        {
        projectsgrid.innerHTML = '<p style="text-align: center; color: #ef4444;">Failed to load projects. Please check the console for details.</p>';
        }
    });
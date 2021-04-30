
const User = {
    Informations: {
        name: 'Hercule',
        job: 'Demi-Dieu',
        age: 35,
        department: 75,
        arm: 60.5,
        inRelationship: true,
    } ,
    Friends: ['Jupiter', 'Junon', 'Alcamère', 'Déjanire'],
    setTitle: () => {
        const TITLE = document.createElement('h1');
        TITLE.className = 'banner__title';
        TITLE.textContent = `Vous consultez le profil de ${User.Informations.name}`;
        document.getElementById('header-banner').appendChild(TITLE);
    },
    displayUserWorks: () => {
        for (let i=0; i < 11; i++)
        base.displayWork(i);
    },
    knowUserDisponibility: () => {
        const CURRENT_HOUR = base.getHour();
        const AVAILABILITY = document.getElementById('availability');
        if (8 < CURRENT_HOUR && CURRENT_HOUR < 20) {
            AVAILABILITY.textContent = 'Disponible';
        } else {
            AVAILABILITY.classList.add('off');
            AVAILABILITY.textContent = 'Non disponible';
        }
    },
    generateUsername : (name, dptNb) => {
        const USERNAME = `${name}-du-${dptNb}`
        document.getElementById('profil-name').textContent = USERNAME; 
    },
    showPopularity : () => {
        const USER_TRENDS = document.getElementById('trends-hercule');
        const ENEMY_TRENDS = document.getElementById('trends-cesar');
        const USER_UPVOTE = base.vote.hercule;
        const ENEMY_UPVOTE = base.vote.cesar;
        const TOTAL_UPVOTES = USER_UPVOTE + ENEMY_UPVOTE;
        const CalculPercentage = (vote, total = TOTAL_UPVOTES) => {
            return Math.round(vote / total * 100);
        }

        const USER_PERCENTAGE = CalculPercentage(USER_UPVOTE)
        const ENEMY_PERCENTAGE = CalculPercentage(ENEMY_UPVOTE)
        
        USER_TRENDS.querySelector('.people__popularity').textContent = `${USER_PERCENTAGE}%`
        USER_TRENDS.querySelector('.people__bar').style.width = `${USER_PERCENTAGE}%`
        ENEMY_TRENDS.querySelector('.people__popularity').textContent = `${ENEMY_PERCENTAGE}%`
        ENEMY_TRENDS.querySelector('.people__bar').style.width = `${ENEMY_PERCENTAGE}%`
    },
    showActivities : (activities) => {
        const ACTIVITIES = document.getElementById('activities')
        const ACTIVITIES_LIST = ACTIVITIES.querySelector('.tasks');
        for(let i=0; i < activities.length; i++) {
            ACTIVITIES.classList.remove('hidden');
            const LI = document.createElement('li');
            if (activities[i].finished && activities[i].author === User.Informations.name) {
                LI.textContent = `${activities[i].title}`
                ACTIVITIES_LIST.appendChild(LI)
            }
        }
    },
    updateProfilInformations: () => {
        base.fillProfil(User.Informations);
        base.printFriends(User.Friends);
        base.setBestFriend(User.Friends[1]);
        User.setTitle();
        User.displayUserWorks();
        User.knowUserDisponibility();
        User.generateUsername(User.Informations.name, User.Informations.department);
        User.showPopularity();
        User.showActivities(base.activities);
    },
    MenuToggleListener : () => {
        const BURGER_MENU = document.getElementById('menu-toggler');
        const HEADER = document.getElementById('header-banner');
        BURGER_MENU.addEventListener('click', () => {
            HEADER.classList.toggle('banner--open')
        })
    },
    ContactFormOnSubmit: () => {
        const CONTACT_FORM = document.getElementById('contact');

        CONTACT_FORM.addEventListener('submit', (evt) => {
            evt.preventDefault();
            alert(`${User.Informations.name} ne souhaite pas être dérangé!`)
        })
    },
    ListenersGestion: () => {
        User.MenuToggleListener();
        User.ContactFormOnSubmit()
    },
    init: () => {
        User.updateProfilInformations();
        User.ListenersGestion();
    },
}

User.init();
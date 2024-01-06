const userData = {
    about: {
        hero: {
            headings: {
                introduction: "I'm <b>Rasmus</b>. This is my portfolio and website. Here you can find my latest projects and favorite podcasts.",
                call_to_action_one: "Discover what I'm building",
                call_to_action_two: "Get to know me",
            },
        },
        introduction: {
            heading: "About Me",
            description: "Hi, I'm <span class='text-black dark:text-white'>Rasmus Lagerqvist</span>, a recent <span class='text-black dark:text-white'>Information Technology</span> engineering graduate and full-stack developer from Helsinki, Finland. Diving into the software development scene in 2019, it's been a whirlwind of learning and coding ever since. Always been a tech enthusiast, and the more I explore, the more I realize how much there is to discover even though it can be scary at times.\n\
            What really keeps me going? Real-world problems and crafting solutions that make a difference. After all, that's what it's all about, right?",
            description_alt: "Note: I'm currently looking for a full-time position as a software developer, so if you're looking for someone to join your team, feel free to reach out!",
            call_to_action: "See what I'm up to",
        },
        interests: {
            heading: "Interests",
            description: "As previously mentioned, I'm driven by problem-solving, no matter the stack. Currently my strongsuit is <span class='text-black dark:text-white'>web-development</span>, but I'm looking into <span class='text-black dark:text-white'>DevOps</span> and <span class='text-black dark:text-white'>Cybersecurity</span>, both of which I feel I can contribute in, especially when I learn more. Thus far I've created various full-stack projects which all are purpose made\n\
            to serve a purpose or solve a real-world problem. I aim to build dynamic and robust applications, not just to improve my own environment, but also to make life easier for others. I understand how frustrating it can be to use a buggy app, so I strive to create software that genuinely helps people.",
            call_to_action: "See what keeps me motivated",
        },
        buzzwords: {
            heading: "Buzzwords",
            description: "Here's a list of some of the technologies I like working with. I'm always looking to expand my skillset, so if you have any suggestions, feel free to reach out.",
            list: [
                "React",
                "Next.js",
                "JavaScript",
                "TypeScript",
                "AWS",
                "MySQL & MongoDB",
                "Tailwind CSS & Bootstrap",
                "Python",
            ],
        },
        contact: {
            heading: "Contact Me",
            description: "Want to collaborate on something or just have a question? Down below you can find my social links if you want to reach out. I'll get back to you as soon as possible.",
            description_alt: "If you're old school, send me an email",
        },
    },
    experience: {
        heading: "Experience",
        positions: [
            {
                title: "Software Developer",
                company: "Jotbar Solutions Oy",
                year: "2022 - Present",
                companyLink: "https://www.jotbar.fi/",
                desc: "Web development with React.js and C#. Migration of company services to the cloud with AWS. Created, maintained, and migrated all company pages to AWS using using AWS Lightsail. ",
            },
            {
                title: "Web Designer",
                company: "TechLabs",
                year: "2022",
                companyLink: "https://techlabs.fi/",
                desc: "Worked as a web designer for Arcada's research department TechLabs. Responsible for designing and optimizing user experiences for the company's website in Figma.",
            },
            {
                title: "Junior Software Developer",
                company: "Jotbar Solutions Oy",
                year: "2021",
                companyLink: "https://www.jotbar.fi/",
                desc: "Web Development with React.js and C#.",
            },
            {
                title: "Student",
                company: "Arcada University of Applied Sciences",
                year: "2020 - 2023",
                companyLink: "https://www.arcada.fi/en",
                desc: "Bachelor of Engineering - Information Technology. Key highlights include full-stack web development projects, networking, cyber security, and various projects in Python. Additionally, experience in machine learning and computer vision. Graduating fall 2023.",
            },
        ],
    },
    projects: {
        heading: "Projects",
        heading_featured: "Featured Projects",
        heading_recent: "Recent Projects",
        description: "Every developer inevitably creates some personal projects to expand their skillset or to solve a problem. Here you can find some of my featured projects and also my most recent creations.",
        description_featured: "These are some my most recent and interesting projects. The source code and more info on some of these projects can be found on <a href='https://www.github.com/lagerqvr' class='text-black dark:text-white'>GitHub</a>.",
        description_recent: "Here are my most recent projects. You can find more info on <a href='https://www.github.com/lagerqvr' class='text-black dark:text-white'>GitHub</a>.",
        featured: [
            {
                title: "Sitzy.app",
                description: "Sitzy.app is an API wrapper that allows users to reserve tickets over the web via the Kide.app API. Built with Javascript, Bootstrap, and Firebase, Sitzy.app serves as an alternate frontend to Kide.app's API. Due to the nature of the service, Sitzy.app's source code is not public. The app has been made available exclusively for friends and family.",
                imgSrc: "/img/sitzy.png",
                link: "",
            },
            {
                title: "Arabia Lunch",
                description: "Arabia Lunch is a simple frontend for fetching student lunch menus in Arabianranta area in Helsinki. The site currently supports four lunch restaurants; Artebia 135 (Metropolia), Arcada, DIAK and UniCafe Chemicum. The website can be installed on both iOS and Android to function like an application. Built with Vanilla JS and Bootstrap.",
                imgSrc: "/img/arabia_lunch.png",
                link: "https://github.com/lagerqvr/arabia-lunch",
            },
            {
                title: "Frunk",
                description: "Frunk is a simple and user-friendly student card generator that enables alumni to effortlessly create digital student ID cards. Frunk was created as part of a course at Arcada to solve the issue with some graduated friends not being able to join in on a cheap student lunch. The source code for Frunk is not public and the app was created purely for academic purposes.",
                imgSrc: "/img/frunk.png",
                link: "",
            },
        ],
    },
    favorites: {
        heading: "Favorites",
        description: "Equality is important, but we all have our favorites. Here I've listed some of my preferred things to listen to and watch. I'd like to list all my favorites, but I've attempted to keep this list short and sweet. Enjoy!",
        podcasts: {
            heading: "Podcasts",
            description: "I regularly listen to all of these podcasts and can't recommend them enough. They're not just packed with useful information, but also provide an excellent opportunity to learn more.",
            items: [
                {
                    title: "Darknet Diaries",
                    description: "Darknet Diaries might not be coding related, but it's a great podcast for anyone interested in cyber security. The podcast is hosted by Jack Rhysider, who interviews hackers and security experts about their experiences. The podcast is well produced and the stories are always interesting.",
                    imgSrc: "/img/darknet_diaries.jpeg",
                    link: "https://darknetdiaries.com/",
                },
                {
                    title: "Command Line Heroes",
                    description: "Command Line Heroes is a podcast by Red Hat that explores the history of open source and the people who create it. The podcast is hosted by Saron Yitbarek, who interviews developers and open source advocates about their experiences. This one is also well produced and worth a listen.",
                    imgSrc: "/img/command_line_heroes.jpeg",
                    link: "https://www.redhat.com/en/command-line-heroes",
                },
                {
                    title: "Syntax",
                    description: "Syntax is a podcast hosted by Wes Bos and Scott Tolinski. The podcast is aimed at web developers and covers a wide range of topics. Syntax is a great podcast for anyone interested in web development and the hosts are very knowledgeable.",
                    imgSrc: "/img/syntax.jpeg",
                    link: "https://syntax.fm/",
                },

            ],
        },
        youtube: {
            heading: "YouTube",
            description: "Here I've listed some of my favorite YouTube channels. These channels are all related to technology and I've learned a lot from them. I've also included a link to their respective channels.",
            items: [
                {
                    title: "Fireship",
                    description: "Fireship is one of the most entertaining tech channels I've found on YouTube. The channel is hosted by Jeff Delaney, who creates short and informative videos about web development. The videos are visually appealing and the content is always interesting and up-to-date.",
                    imgSrc: "/img/fireship.jpg",
                    link: "https://www.youtube.com/c/fireship",
                },
                {
                    title: "freeCodeCamp.org",
                    description: "freeCodeCamp is a non-profit organization that provides free coding tutorials and courses. The organization also has a YouTube channel, which is hosted by Beau Carnes. The channel is packed with useful content and the videos are well produced by a wide range of hosts. Even though the channel is more aimed at beginners, they have some more advanced content as well.",
                    imgSrc: "/img/freecodecamp.jpg",
                    link: "https://www.youtube.com/@freecodecamp",
                },
            ],
        },
    },
    contact: {
        heading: "Contact Me",
        description: "Have a job offer or just want to chat? Reach out and we'll go from there.",
        form_name: "Full Name",
        form_email: "Email Address",
        form_message: "Message",
        form_button: "Send Message",
    },
    socialLinks: {
        github: "https://github.com/lagerqvr",
        linkedin: "https://www.linkedin.com/in/rasmus-lagerqvist/",
        email: "mailto:contact@lagerqvr.com",
        telegram: "https://t.me/lagerqvr",
    },
};

export default userData;
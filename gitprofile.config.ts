// gitprofile.config.ts

const CONFIG = {
  github: {
    username: 'cgobat', // Your GitHub org/user name. (This is the only required config)
  },
  /**
   * If you are deploying to https://<USERNAME>.github.io/, for example your repository is at https://github.com/arifszn/arifszn.github.io, set base to '/'.
   * If you are deploying to https://<USERNAME>.github.io/<REPO_NAME>/,
   * for example your repository is at https://github.com/arifszn/portfolio, then set base to '/portfolio/'.
   */
  base: '/',
  projects: {
    github: {
      display: true, // Display GitHub projects?
      header: 'Github Projects',
      mode: 'automatic', // Mode can be: 'automatic' or 'manual'
      automatic: {
        sortBy: 'updated', // Sort projects by 'stars' or 'updated'
        limit: 6, // How many projects to display.
        exclude: {
          forks: false, // Forked projects will not be displayed if set to true.
          projects: ['cgobat/cgobat', 'cgobat/cgobat.github.io'], // These projects will not be displayed. example: ['arifszn/my-project1', 'arifszn/my-project2']
        },
      },
      // manual: {
      //   // Properties for manually specifying projects
      //   projects: ['arifszn/gitprofile', 'arifszn/pandora'], // List of repository names to display. example: ['arifszn/my-project1', 'arifszn/my-project2']
      // },
    },
    external: {
      header: 'My Projects',
      // To hide the `External Projects` section, keep it empty.
      projects: [
        // {
        //   title: 'Project Name',
        //   description:
        //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut.',
        //   imageUrl:
        //     'https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg',
        //   link: 'https://example.com',
        // },
        // {
        //   title: 'Project Name',
        //   description:
        //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut.',
        //   imageUrl:
        //     'https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg',
        //   link: 'https://example.com',
        // },
      ],
    },
  },
  seo: {
    title: 'Caden Gobat\'s Portfolio',
    description: '',
    imageURL: '',
  },
  social: {
    linkedin: 'caden.gobat',
    stackoverflow: '', // example: '1/jeff-atwood'
    website: 'https://go.gwu.edu/cgobat',
    phone: '',
    email: '',
  },
  resume: {
    fileUrl:
      '', // Empty fileUrl will hide the `Download Resume` button.
  },
  skills: [
    'Python',
    'Git',
    'XML',
  ],
  experiences: [
    {
      company: 'Southwest Research Institute',
      position: 'Analyst',
      from: 'July 2022',
      to: 'present',
      companyLink: 'https://boulder.swri.edu/',
    },
    // {
    //   company: 'Company Name',
    //   position: 'Position',
    //   from: 'July 2019',
    //   to: 'August 2021',
    //   companyLink: 'https://example.com',
    // },
  ],
  // certifications: [
  //   {
  //     name: 'Lorem ipsum',
  //     body: 'Lorem ipsum dolor sit amet',
  //     year: 'March 2022',
  //     link: 'https://example.com',
  //   },
  // ],
  educations: [
    {
      institution: 'George Washington University',
      degree: 'B.S., Astronomy & Astrophysics',
      from: '2018',
      to: '2022',
    },
    // {
    //   institution: 'Institution Name',
    //   degree: 'Degree',
    //   from: '2012',
    //   to: '2014',
    // },
  ],
  publications: [
    {
      title: 'A contact binary satellite of the asteroid (152830) Dinkinesh',
      conferenceName: '',
      journalName: 'Nature',
      authors: 'Levison, H. F., et al. (incl. Gobat, C.)',
      link: 'https://ui.adsabs.harvard.edu/abs/2024Natur.629.1015L/abstract',
      description: '',
    },
    {
      title: 'The Lucy Mission Science Operations Center',
      conferenceName: 'Asteroids, Comets, & Meteors',
      journalName: '',
      authors: 'Parker, J. Wm., Birath, E., Crombie, M. K., Egan, A., Gobat, C. et al.',
      link: 'https://ui.adsabs.harvard.edu/abs/2023LPICo2851.2352P/abstract',
      description: '',
    },
    {
      title: 'Optical darkness in short-duration γ-ray bursts',
      conferenceName: '',
      journalName: 'Monthly Notices of the Royal Astronomical Society',
      authors: 'Gobat, C., van der Horst, A. J., & Fitzpatrick, D.',
      link: 'https://ui.adsabs.harvard.edu/abs/2023MNRAS.523..775G/abstract',
      description: '',
    },
    {
      title: 'Design and Implementation of the Lucy Mission PDS4 Archive',
      conferenceName: 'Planetary Data Workshop',
      journalName: '',
      authors: 'Gobat, C., Crombie, M. K., Parker, J. Wm., & Kaufmann, D.',
      link: 'https://ui.adsabs.harvard.edu/abs/2023LPICo2851.2352P/abstract',
      description: '',
    },
    {
      title: 'Catalog of X-ray Detected Be Stars (XDBS)',
      conferenceName: '',
      journalName: 'Research Notes of the American Astronomical Society',
      authors: 'Gobat, C., Yang, H., Kargaltsev, O., Hare, J., & Volkov, I.',
      link: 'https://ui.adsabs.harvard.edu/abs/2022RNAAS...6..163G/abstract',
      description: '',
    },
  ],
  // Track visitor interaction and behavior. https://www.hotjar.com
  // hotjar: {
  //   id: '',
  //   snippetVersion: 6,
  // },
  themeConfig: {
    defaultTheme: 'dim',

    // Hides the switch in the navbar
    // Useful if you want to support a single color mode
    disableSwitch: false,

    // Should use the prefers-color-scheme media-query,
    // using user system preferences, instead of the hardcoded defaultTheme
    respectPrefersColorScheme: false,

    // Display the ring in Profile picture
    displayAvatarRing: true,

    // Available themes. To remove any theme, exclude from here.
    themes: [
      'light',
      'dark',
    ],

  },

  // Optional Footer. Supports plain text or HTML.
  footer: `Copyright (C) 2025 Caden Gobat.
      Made with <a  class="text-primary" href="https://github.com/arifszn/gitprofile" target="_blank" rel="noreferrer">GitProfile</a>.`,

  enablePWA: true,
};

export default CONFIG;

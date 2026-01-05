const config = {
    // GitHub Username (used for fetching repos and profile)
    githubUsername: "marius4lui",

    // Navbar Logo Text
    logoText: "M4L.",

    // Hero Section
    hero: {
        subtitle: "HELLO, I AM A DEVELOPER",
        title: "MARIUS",
        titleSuffix: "4LUI", // The outlined part
    },

    // Ventures / Products Section
    // Leave array empty [] to hide section
    ventures: [
        {
            title: "KMUC Digital",
            description: "Professional Websites & Online-Shops. Transforming businesses with tailored digital solutions.",
            tag: "AGENCY",
            url: "https://kmuc.online"
        },
        {
            title: "Vetra UI",
            description: "Modern Landing Page Template & UI Library. Built with Tailwind CSS and React.",
            tag: "OPEN SOURCE",
            url: "https://vetra.kmuc.online"
        },
        {
            title: "Toolbox",
            description: "Modern Desktop Utilities. Powerful image compression and workflow tools.",
            tag: "SOFTWARE",
            url: "https://qhrd.online"
        }
    ],

    // Branding Colors (will overwrite CSS variables)
    theme: {
        accentColor: "#D4FF00", // The lime green
        textColor: "#ffffff",
        secondaryColor: "#aaaaaa",
        backgroundColor: "#050505"
    }
};

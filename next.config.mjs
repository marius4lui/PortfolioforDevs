/** @type {import('next').NextConfig} */
const nextConfig = {
    // We are using raw CSS, so no tailwind modification needed as requested by User (Vanilla CSS preference).
    // The Wizard uses inline styles or global classes defined in globals.css. 
    // Wait, I used tailwind utility classes in the Wizard component (bg-black/80, p-4 etc)
    // BUT the user said "Vanilla CSS". 
    // However, I just pasted React code with Tailwind classes. 
    // I MUST FIX THE WIZARD TO USE VANILLA CSS OR ENABLE TAILWIND.
    // The user rules say: "Use Vanilla CSS... Avoid using TailwindCSS unless USER explicitly requests it".
    // I made a mistake in the SetupWizard.tsx using Tailwind classes.
    // I need to rewriting SetupWizard.tsx to use Vanilla CSS modules or inline styles.
};

export default nextConfig;

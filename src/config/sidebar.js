import { RxDashboard, RxPerson, RxFileText, } from "react-icons/rx";

const sidebar = [
    {
        name: "Dashboard",
        icon: <RxDashboard />,
        route: "/dashboard",
    },
    // {
    //     name: "Profile",
    //     icon: <RxPerson />,
    //     route: "user",
    // },
    {
        name: "Article Generation",
        icon: <RxFileText />,
        route: "/article-generation",
    },
    {
        name: "Summary Generation",
        icon: <RxFileText />,
        route: "/summary-generation",
    }
];

export default sidebar;

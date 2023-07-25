import { NbMenuItem } from "@nebular/theme";

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: "Dashboard",
    icon: "home-outline",
    link: "/pages/dashboard",
    home: true,
  },
  {
    title:"Paramétrage",
    icon:"settings-2-outline",
    data:"Admin",
    expanded:false,
    children:[
      {
        title: "Type conteneur",
        icon: "arrowhead-right-outline",
        link: "/pages/typeConteneur",
      },
      {
        title: "Parc",
        icon: "arrowhead-right-outline",
        link: "/pages/parc",
      },
      {
        title: "Type dommage",
        icon: "arrowhead-right-outline",
        link: "/pages/typeDommage",
      }
    ]
  },
  {
    title: "Armateur",  
    icon: "paper-plane-outline",
    link: "/pages/armateur",
    data: "Armateur"
  },
  {
    title: "Agent de Parc",
    icon: "person-outline",
    link: "/pages/agentParc",
    data: "Agent",
  },
  {
    title: "Transporteur",
    icon: "car-outline",
    link: "/pages/transporteur",
  },
  {
    title: "Utilisateurs",
    icon: "people-outline",
    link: "/pages/user",
    data: "Agent",
  },
  {
    title: "Conteneur",
    icon: "cube-outline",
    link: "/pages/conteneur",
    data: "ConteneurArmateur"
  },
  // {
  //   title: "test",
  //   icon: "grid-outline",
  //   link: "/pages/test",
  // },
  {
    title : "Demande",
    icon:"clipboard-outline",
    link :"/pages/demande",
    data: "saufAgent"
  },
  {
    title: "Demande",
    icon: "clipboard-outline",
    link: "/pages/demandeAgent",
    data: "DemandeAgent"
  },
  
];

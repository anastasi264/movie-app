import { colorConfigs } from "../../../configs/colorConfigs";
import { sizeConfigs } from "../../../configs/sizeConfigs";

export const sidebarStyles = {
  drawer: {
    width: sizeConfigs.sidebar.width,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: sizeConfigs.sidebar.width,
      boxSizing: 'border-box',
      bgcolor: '#1A161F',
    },
  },

  logo: {
    fontSize: "30px",
    fontWeight: "bold",
    marginTop: "30px",
    color: colorConfigs.main.color,
  },

  typography: {
    fontSize: "18px",
    ml: '16px',
    color: colorConfigs.sidebar.color,
  },

  list: {
    ml: '30px',
    mt: '40px',
    fontSize: '22px',
  },

  listItemButton: {
  },

  lisitItemIcon: {
    color: colorConfigs.sidebar.color,
  },

  navLink: {
    color: colorConfigs.sidebar.color,
    textDecoration: "none",
  },
}

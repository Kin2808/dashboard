import { useState } from "react";
import { Link } from "react-router-dom";

import { Container, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";

import { BsShopWindow } from "react-icons/bs";
import { SidebarData } from "../data/Data";

function Sidebar() {
  const [active, setActive] = useState(0);
  return (
    <SidebarContainer>
      <Typography variant="h4" align="center" pt={6}>
        <BsShopWindow /> Shops
      </Typography>

      <Grid container direction="column" mt={4}>
        {SidebarData.map((item, index) => {
          const isActived = index === active;
          return (
            <GridSideBar
              item
              key={index}
              onClick={() => setActive(index)}
              sx={{ borderBottom: isActived ? "2px solid" : "none" }}
              component={Link}
              to={item.link}
            >
              <Typography>
                <item.icon style={{ marginRight: "10px" }} /> {item.title}
              </Typography>
            </GridSideBar>
          );
        })}
      </Grid>
    </SidebarContainer>
  );
}

export default Sidebar;

const SidebarContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  background: "linear-gradient( #000000,#2C3E50)",
});

const GridSideBar = styled(Grid)({
  marginTop: "3rem",
  position: "relative",
  cursor: "pointer",

  "&:after": {
    content: '""',
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "2px",
    background: "white",
    transform: "scaleX(0)",
    transformOrigin: "left",
    transition: "all 250ms",
    opacity: 0,
  },

  "&:hover:after": {
    transform: "scaleX(1)",
    opacity: 1,
  },
});

import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppShell, Group, Anchor, Button } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import tokenService from "../services/token.service";

const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = tokenService.LoggedIn();
  const isHomePage = location.pathname === "/";

  const logout = () => {
    tokenService.removeToken();
    navigate("/login");
  };

  const publicLinks = [
    { id: 1, title: "Home", path: "/" },
    { id: 2, title: "About", path: "/about" },
    { id: 7, title: "Contact Us", path: "/contact" },
  ];

  const privateLinks = [
    { id: 5, title: "Dashboard", path: "/consultant/dashboard" },
  ];

  const Links = isLoggedIn ? [...publicLinks, ...privateLinks] : [...publicLinks];

  return (
    <AppShell.Header
      style={{
        background: isHomePage ? "transparent" : "#fff",
        position: isHomePage ? "absolute" : "relative",
        top: isHomePage ? 0 : "auto",
        left: isHomePage ? 0 : "auto",
        right: isHomePage ? 0 : "auto",
        zIndex: isHomePage ? 1000 : "auto",
        marginBottom: isHomePage ? 0 : 24,
        borderBottom: isHomePage ? "none" : "1px solid #f0f0f0",
      }}
    >
      <Group
        justify="space-between"
        align="center"
        h="100%"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        <Anchor
          component={Link}
          to="/"
          underline="never"
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: isHomePage ? "white" : "#004d99",
          }}
        >
          Dubai Permits
        </Anchor>

        <Group gap="xl">
          {Links.map((d) => (
            <Anchor
              key={d.id}
              component={Link}
              to={d.path}
              underline="never"
              style={{
                color: isHomePage ? "white" : "#222",
                fontWeight: location.pathname === d.path ? 600 : 400,
              }}
            >
              {d.title}
            </Anchor>
          ))}
          
          {!isLoggedIn ? (
            <Anchor
              component={Link}
              to="/login"
              underline="never"
              style={{
                color: isHomePage ? "white" : "#222",
              }}
            >
              Login
            </Anchor>
          ) : (
            <Button
              variant="subtle"
              color={isHomePage ? "white" : "dark"}
              leftSection={<IconLogout size={16} />}
              onClick={logout}
            >
              Logout
            </Button>
          )}
        </Group>
      </Group>
    </AppShell.Header>
  );
};

export default Menu;

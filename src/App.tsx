import { Outlet } from "react-router-dom";
import Menu from "./shared/menu";
import Footer from "./shared/footer";
import { AppShell, Box } from "@mantine/core";

const App = () => {
  return (
    <AppShell
      header={{ height: 64 }}
      padding={0}
      styles={{
        main: {
          minHeight: "100vh",
          background: "transparent",
        },
      }}
    >
      <Menu />
      <AppShell.Main>
        <Box
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            width: "100%",
            background: "transparent",
          }}
        >
          <main>
            <Outlet />
          </main>
        </Box>
        <Footer />
      </AppShell.Main>
    </AppShell>
  );
};

export default App;

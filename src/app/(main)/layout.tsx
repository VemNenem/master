import Sidebar from "@/app/components/sidebar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={style.container}>
      <Sidebar />
      <main style={style.main}>{children}</main>
    </div>
  );
}

const style = {
  container: {
    display: "flex",
    minHeight: "100vh",
  },
  main: {
    flex: 1,
    padding: "20px",
    backgroundColor: "#f9f9f9",
  },
};

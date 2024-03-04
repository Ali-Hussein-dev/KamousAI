import { Button } from "@/components/ui/button";
const buttons = [
  { variant: "default", label: "default" },
  { variant: "secondary", label: "secondary" },
  { variant: "light", label: "light" },
  { variant: "outline", label: "outline" },
  { variant: "ghost", label: "ghost" },
  { variant: "destructive", label: "destructive" },
  { variant: "success", label: "success" },
] as const;
const Container = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="rounded border p-2">
    <h2 className="mb-2">{title}</h2>
    <div className="w-full gap-4 flex-col-start">
      <>{children}</>
    </div>
  </section>
);
//======================================
const UIPage = () => {
  return (
    <div className="grid min-h-screen grid-cols-5 gap-4 bg-slate-800 p-2">
      <Container title="Button Variants">
        {buttons.map((button) => (
          <Button key={button.variant} variant={button.variant}>
            {button.label}
          </Button>
        ))}
      </Container>
      <Container title="Button lg">
        {buttons.map((button) => (
          <Button key={button.variant} variant={button.variant} size="lg">
            {button.label}
          </Button>
        ))}
      </Container>
      <Container title="Button sm">
        {buttons.map((button) => (
          <Button key={button.variant} variant={button.variant} size="sm">
            {button.label}
          </Button>
        ))}
      </Container>
      <Container title="Button Disabled">
        {buttons.map((button) => (
          <Button key={button.variant} variant={button.variant} disabled>
            {button.label}
          </Button>
        ))}
      </Container>
      <Container title="Button icon">
        {buttons.map((button) => (
          <Button key={button.variant} variant={button.variant} size="icon">
            icon
          </Button>
        ))}
      </Container>
    </div>
  );
};
export default UIPage;

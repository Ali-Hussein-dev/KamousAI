import { Button } from "@mantine/core";
import { AiOutlineClear } from "react-icons/ai";

interface ClearButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
  visible: boolean;
}

export const ClearButton: React.FC<ClearButtonProps> = ({
  isLoading,
  visible,
  ...rest
}) => {
  return visible ? (
    <Button
      variant="light"
      opacity={isLoading ? 0 : 1}
      color="red"
      leftSection={<AiOutlineClear />}
      {...rest}
    >
      Clear
    </Button>
  ) : null;
};

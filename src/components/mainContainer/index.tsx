import { StyledMain } from "./syled";
import { ReactNode } from "react";

export default function MainContainer({ children }: { children: ReactNode }): JSX.Element {
  return (
    <StyledMain id='container'>
      { children }
    </StyledMain>
  )
}
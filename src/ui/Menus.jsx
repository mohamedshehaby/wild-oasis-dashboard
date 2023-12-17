import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;
  z-index: 100;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

function Menus({ children }) {
  const [openName, setOpenName] = useState("");
  const [position, setPosition] = useState(null);

  const closeMenu = () => setOpenName("");

  const openMenu = setOpenName;

  return (
    <MenusContext.Provider
      value={{ openName, openMenu, closeMenu, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Menu({ children }) {
  return <StyledMenu>{children}</StyledMenu>;
}

function Toggle({ opens, children }) {
  const { openName, openMenu, closeMenu, setPosition } =
    useContext(MenusContext);

  function handleClick(e) {
    e.stopPropagation();
    // We here click on the svg so we need to get the
    // button element to get the position of the button element and not the svg element
    const rect = e.target.closest("button").getBoundingClientRect();

    setPosition({
      x: window.innerWidth - rect.x,
      y: rect.y + rect.height,
    });
    openName === opens ? closeMenu() : openMenu(opens);
    console.log("toggle click");
  }

  return <StyledToggle onClick={handleClick}>{children}</StyledToggle>;
}

function List({ children, opens }) {
  const { openName, position, closeMenu } = useContext(MenusContext);
  const ref = useOutsideClick(closeMenu, false);

  if (openName !== opens) return null;

  return createPortal(
    <StyledList ref={ref} position={position}>
      {children}
    </StyledList>,
    document.body,
  );
}

function Button({ children, onClick }) {
  const { closeMenu } = useContext(MenusContext);

  return (
    <li>
      <StyledButton
        onClick={() => {
          onClick?.();
          closeMenu();
        }}
      >
        {children}
      </StyledButton>
    </li>
  );
}

Menus.List = List;
Menus.Button = Button;
Menus.Toggle = Toggle;
Menus.Menu = Menu;
export default Menus;

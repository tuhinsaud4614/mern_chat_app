import { FC, useMemo, forwardRef } from "react";
import { NavLink, LinkProps } from "react-router-dom";
import { ListItem } from "@material-ui/core";
import { Omit } from "@material-ui/types";

interface Props {
  to: string;
  activeClassName?: string;
  selected: boolean;
}

const ListItemLink: FC<Props> = ({
  to,
  activeClassName,
  selected,
  children,
}) => {
  const renderLink = useMemo(
    () =>
      forwardRef<any, Omit<LinkProps, "to">>((itemProps, ref) => (
        <NavLink
          to={to}
          ref={ref}
          activeClassName={activeClassName}
          {...itemProps}
        />
      )),
    [to, activeClassName]
  );
  return (
    <ListItem button selected={selected} component={renderLink}>
      {children}
    </ListItem>
  );
};

export default ListItemLink;

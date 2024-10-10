import { useState, useTransition } from "react";
import {
  Box,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import { logoutAction } from "@/app/(pages)/login/actions";
import { useAppDispatch } from "@/lib/redux/hooks";
import { logout } from "@/lib/redux/slices/auth-slice";

const HeaderUserMenu = () => {
  const dispatch = useAppDispatch();
  const [isPending, startTransition] = useTransition();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    startTransition(async () => {
      const result = await logoutAction();
      if (result.error) {
        // do something
        console.error(result.error);
      } else {
        // this will automatically redirect to the home page
        // since it will check again in the login page if it's authenticated
        dispatch(logout());
        window.location.href = "/login";
      }
      handleCloseUserMenu();
    });
  };

  return (
    <Box>
      <Tooltip title="Account settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={"user"} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleLogout} disabled={isPending}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default HeaderUserMenu;

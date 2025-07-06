"use client";

import * as React from "react";
import { createContext, useContext, useState } from "react";
import { Slot } from "@radix-ui/react-slot";
import { PanelLeft } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";
import styles from "./sidebar.module.css";

const SIDEBAR_COOKIE_NAME = "sidebar:state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarContext = createContext<SidebarContextProps>({
  open: false,
  setOpen: () => undefined,
});

function SidebarProvider({
  children,
  defaultOpen = true,
}: {
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

function useSidebar() {
  return useContext(SidebarContext);
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
}

function Sidebar({ className, ...props }: SidebarProps) {
  const { open } = useSidebar();

  return (
    <aside
      className={`${styles.sidebar} ${className || ""}`}
      data-state={open ? "open" : "closed"}
      {...props}
    />
  );
}

function SidebarHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`${styles.header} ${className || ""}`} {...props} />;
}

function SidebarContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`${styles.content} ${className || ""}`} {...props} />;
}

function SidebarFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`${styles.footer} ${className || ""}`} {...props} />;
}

function SidebarRail({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`${styles.rail} ${className || ""}`} {...props} />;
}

function SidebarMenu({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`${styles.menu} ${className || ""}`} {...props} />;
}

function SidebarMenuItem({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`${styles.menuItem} ${className || ""}`} {...props} />;
}

interface SidebarMenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "default" | "sm" | "lg";
  asChild?: boolean;
}

function SidebarMenuButton({
  className,
  size = "default",
  asChild = false,
  ...props
}: SidebarMenuButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={`${styles.menuButton} ${className || ""}`}
      data-size={size}
      {...props}
    />
  );
}

function SidebarInset({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { open } = useSidebar();

  return (
    <div
      className={`${styles.inset} ${className || ""}`}
      data-state={open ? "open" : "closed"}
      {...props}
    />
  );
}

function SidebarTrigger({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { open, setOpen } = useSidebar();

  return (
    <button
      className={`${styles.trigger} ${className || ""}`}
      onClick={() => setOpen(!open)}
      {...props}
    >
      <PanelLeft className={styles.triggerIcon} />
      <span className={styles.srOnly}>Toggle Sidebar</span>
    </button>
  );
}

function SidebarSeparator({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`${styles.separator} ${className || ""}`} {...props} />
  );
}

function SidebarInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`${styles.input} ${className || ""}`} {...props} />;
}

function SidebarGroup({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`${styles.group} ${className || ""}`} {...props} />;
}

function SidebarGroupContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`${styles.groupContent} ${className || ""}`} {...props} />
  );
}

function SidebarGroupLabel({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`${styles.groupLabel} ${className || ""}`} {...props} />
  );
}

function SidebarGroupAction({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${styles.groupAction} ${className || ""}`} {...props} />
  );
}

function SidebarMenuAction({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${styles.menuAction} ${className || ""}`} {...props} />
  );
}

function SidebarMenuBadge({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`${styles.menuBadge} ${className || ""}`} {...props} />
  );
}

function SidebarMenuSkeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`${styles.menuSkeleton} ${className || ""}`} {...props}>
      <div className={styles.menuSkeletonInner} />
    </div>
  );
}

function SidebarMenuSub({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`${styles.menuSub} ${className || ""}`} {...props} />;
}

function SidebarMenuSubButton({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`${styles.menuSubButton} ${className || ""}`}
      {...props}
    />
  );
}

function SidebarMenuSubItem({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`${styles.menuSubItem} ${className || ""}`} {...props} />
  );
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarInput,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};

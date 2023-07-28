import React from "react";
import { Badge } from "./Badge";
import { Icon } from "./Icons";

export function TabIcon({ visibleBadge, iconName, iconColor }) {
  if (visibleBadge) {
    return (
      <Badge fontSize={10}>
        <Icon iconName={iconName} size={20} color={iconColor} />
      </Badge>
    );
  }

  return <Icon iconName={iconName} size={20} color={iconColor} />;
}

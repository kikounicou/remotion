/**
 * SVG Icons for Eval Workflow Infographic
 * Custom icons for AWS services, documents, and workflow elements
 */

import React from "react";

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

// AWS Lambda Icon
export const LambdaIcon: React.FC<IconProps> = ({
  size = 48,
  color = "#FF9900",
}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="8" fill={color} />
    <text
      x="50%"
      y="55%"
      textAnchor="middle"
      dominantBaseline="middle"
      fill="white"
      fontSize="28"
      fontWeight="bold"
      fontFamily="Georgia, serif"
    >
      λ
    </text>
  </svg>
);

// AWS S3 Bucket Icon
export const S3Icon: React.FC<IconProps> = ({
  size = 48,
  color = "#569A31",
}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="8" fill={color} />
    <path
      d="M14 16h20v16c0 2-4 4-10 4s-10-2-10-4V16z"
      fill="white"
      opacity="0.9"
    />
    <ellipse cx="24" cy="16" rx="10" ry="4" fill="white" />
    <ellipse cx="24" cy="16" rx="10" ry="4" fill={color} opacity="0.3" />
  </svg>
);

// AWS Textract (Eye/Vision) Icon
export const TextractIcon: React.FC<IconProps> = ({
  size = 48,
  color = "#A166FF",
}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="8" fill={color} />
    <ellipse cx="24" cy="24" rx="14" ry="8" fill="white" opacity="0.9" />
    <circle cx="24" cy="24" r="5" fill={color} />
    <circle cx="24" cy="24" r="2" fill="white" />
  </svg>
);

// AWS EventBridge (Clock) Icon
export const EventBridgeIcon: React.FC<IconProps> = ({
  size = 48,
  color = "#E7157B",
}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="8" fill={color} />
    <circle cx="24" cy="24" r="12" stroke="white" strokeWidth="2" fill="none" />
    <line
      x1="24"
      y1="24"
      x2="24"
      y2="16"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="24"
      y1="24"
      x2="30"
      y2="24"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// Azure Document Intelligence Icon
export const AzureAIIcon: React.FC<IconProps> = ({
  size = 48,
  color = "#0078D4",
}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="8" fill={color} />
    <path
      d="M24 12c-6.6 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12-5.4-12-12-12zm0 4c2.2 0 4 1.8 4 4 0 1.5-.8 2.8-2 3.5v2.5h-4v-2.5c-1.2-.7-2-2-2-3.5 0-2.2 1.8-4 4-4zm-2 14h4v2h-4v-2z"
      fill="white"
    />
  </svg>
);

// N8N Automation Icon
export const N8NIcon: React.FC<IconProps> = ({
  size = 48,
  color = "#FF4F81",
}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="8" fill={color} />
    <path
      d="M14 24h6l4-8 4 16 4-8h6"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

// Document/PDF Icon
export const DocumentIcon: React.FC<IconProps> = ({
  size = 48,
  color = "#64748B",
}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <path
      d="M12 8h16l8 8v24c0 2.2-1.8 4-4 4H16c-2.2 0-4-1.8-4-4V12c0-2.2 1.8-4 4-4z"
      fill={color}
    />
    <path d="M28 8v8h8" fill="white" opacity="0.3" />
    <rect x="16" y="20" width="16" height="2" rx="1" fill="white" opacity="0.7" />
    <rect x="16" y="26" width="12" height="2" rx="1" fill="white" opacity="0.7" />
    <rect x="16" y="32" width="14" height="2" rx="1" fill="white" opacity="0.7" />
  </svg>
);

// Form/Checklist Icon
export const FormIcon: React.FC<IconProps> = ({
  size = 48,
  color = "#10B981",
}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <rect x="8" y="8" width="32" height="32" rx="4" fill={color} />
    <rect x="14" y="14" width="6" height="6" rx="1" fill="white" opacity="0.9" />
    <path d="M15 17l2 2 3-3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <rect x="24" y="15" width="10" height="2" rx="1" fill="white" opacity="0.7" />
    <rect x="14" y="24" width="6" height="6" rx="1" fill="white" opacity="0.9" />
    <rect x="24" y="25" width="10" height="2" rx="1" fill="white" opacity="0.7" />
    <rect x="14" y="34" width="6" height="6" rx="1" fill="white" opacity="0.9" />
    <rect x="24" y="35" width="10" height="2" rx="1" fill="white" opacity="0.7" />
  </svg>
);

// Scanner Icon
export const ScannerIcon: React.FC<IconProps> = ({
  size = 48,
  color = "#6366F1",
}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <rect x="8" y="22" width="32" height="18" rx="3" fill={color} />
    <rect x="12" y="8" width="24" height="14" rx="2" fill="white" opacity="0.2" />
    <rect x="14" y="28" width="20" height="2" rx="1" fill="white" opacity="0.5" />
    <circle cx="36" cy="33" r="3" fill="#10B981" />
  </svg>
);

// Email Icon
export const EmailIcon: React.FC<IconProps> = ({
  size = 48,
  color = "#3B82F6",
}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <rect x="6" y="12" width="36" height="24" rx="4" fill={color} />
    <path
      d="M6 16l18 12 18-12"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

// Server/Database Icon
export const ServerIcon: React.FC<IconProps> = ({
  size = 48,
  color = "#64748B",
}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <rect x="10" y="8" width="28" height="10" rx="2" fill={color} />
    <rect x="10" y="20" width="28" height="10" rx="2" fill={color} />
    <rect x="10" y="32" width="28" height="10" rx="2" fill={color} />
    <circle cx="32" cy="13" r="2" fill="#10B981" />
    <circle cx="32" cy="25" r="2" fill="#10B981" />
    <circle cx="32" cy="37" r="2" fill="#F59E0B" />
  </svg>
);

// Cloud Icon
export const CloudIcon: React.FC<IconProps> = ({
  size = 48,
  color = "#FF9900",
}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <path
      d="M38 28c0-3.3-2.7-6-6-6-.3-5.1-4.6-9-9.8-9-4.5 0-8.3 3-9.5 7.2C9.3 21 7 24 7 27.5 7 31.6 10.4 35 14.5 35H36c2.8 0 5-2.2 5-5s-1.5-3.8-3-4z"
      fill={color}
    />
  </svg>
);

// JSON/Code Icon
export const JsonIcon: React.FC<IconProps> = ({
  size = 48,
  color = "#F59E0B",
}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <rect x="8" y="8" width="32" height="32" rx="4" fill={color} />
    <text
      x="50%"
      y="55%"
      textAnchor="middle"
      dominantBaseline="middle"
      fill="white"
      fontSize="14"
      fontWeight="bold"
      fontFamily="monospace"
    >
      {"{ }"}
    </text>
  </svg>
);

// Dashboard/Chart Icon
export const DashboardIcon: React.FC<IconProps> = ({
  size = 48,
  color = "#8B5CF6",
}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <rect x="8" y="8" width="32" height="32" rx="4" fill={color} />
    <rect x="12" y="28" width="6" height="8" rx="1" fill="white" opacity="0.9" />
    <rect x="21" y="20" width="6" height="16" rx="1" fill="white" opacity="0.9" />
    <rect x="30" y="14" width="6" height="22" rx="1" fill="white" opacity="0.9" />
  </svg>
);

// Robot/AI Icon
export const AIIcon: React.FC<IconProps> = ({
  size = 48,
  color = "#EC4899",
}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <rect x="12" y="14" width="24" height="22" rx="4" fill={color} />
    <circle cx="18" cy="22" r="3" fill="white" />
    <circle cx="30" cy="22" r="3" fill="white" />
    <circle cx="18" cy="22" r="1.5" fill={color} />
    <circle cx="30" cy="22" r="1.5" fill={color} />
    <rect x="18" y="30" width="12" height="2" rx="1" fill="white" opacity="0.8" />
    <rect x="22" y="8" width="4" height="6" rx="2" fill={color} />
    <circle cx="24" cy="8" r="3" fill="#F59E0B" />
  </svg>
);

// People/Users Icon
export const UsersIcon: React.FC<IconProps> = ({
  size = 48,
  color = "#14B8A6",
}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="16" r="8" fill={color} />
    <path
      d="M10 40c0-7.7 6.3-14 14-14s14 6.3 14 14"
      fill={color}
    />
    <circle cx="38" cy="18" r="5" fill={color} opacity="0.6" />
    <circle cx="10" cy="18" r="5" fill={color} opacity="0.6" />
  </svg>
);

// Arrow Right Icon
export const ArrowRightIcon: React.FC<IconProps> = ({
  size = 24,
  color = "#FFFFFF",
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M5 12h14m-6-6l6 6-6 6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Checkmark Icon
export const CheckIcon: React.FC<IconProps> = ({
  size = 24,
  color = "#10B981",
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill={color} />
    <path
      d="M8 12l3 3 5-6"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Scissors/Split Icon
export const SplitIcon: React.FC<IconProps> = ({
  size = 24,
  color = "#F59E0B",
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="6" cy="6" r="3" stroke={color} strokeWidth="2" fill="none" />
    <circle cx="6" cy="18" r="3" stroke={color} strokeWidth="2" fill="none" />
    <path
      d="M8.5 8.5L20 20M8.5 15.5L20 4"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// Building/Institution Icon
export const BuildingIcon: React.FC<IconProps> = ({
  size = 48,
  color = "#8B1A1A",
}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <path d="M8 40V16l16-8 16 8v24H8z" fill={color} />
    <rect x="14" y="20" width="6" height="6" fill="white" opacity="0.8" />
    <rect x="28" y="20" width="6" height="6" fill="white" opacity="0.8" />
    <rect x="14" y="30" width="6" height="6" fill="white" opacity="0.8" />
    <rect x="28" y="30" width="6" height="6" fill="white" opacity="0.8" />
    <rect x="20" y="32" width="8" height="8" fill="white" opacity="0.9" />
  </svg>
);

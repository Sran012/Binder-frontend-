import { useId } from 'react';
import { Field } from '@/components/ui/field';
import { cn } from '@/lib/utils';

const QualityVerificationToggle = ({
  value,
  onChange,
  label = 'Quality Verification',
  width = 'sm',
  className
}) => {
  const normalized = typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value || 'No';
  const isYes = normalized === 'Yes';
  const isNo = normalized === 'No';
  const groupName = `quality-verification-${useId()}`;

  const options = [
    { label: 'Yes', value: 'Yes', selected: isYes },
    { label: 'No', value: 'No', selected: isNo }
  ];
  const selectedIndex = options.findIndex((option) => option.selected);
  const indicatorStyle = {
    width: 'calc(50% - 8px)',
    left: `calc(${Math.max(selectedIndex, 0) * 50}% + 4px)`
  };

  return (
    <Field label={label} width={width} className={className}>
      <div
        className="relative inline-flex w-full max-w-[220px] items-center justify-between rounded-full border border-border/60 bg-white/60 px-1 py-1 shadow-sm shadow-slate-900/5"
        role="radiogroup"
        aria-label={label}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-1 rounded-full bg-primary/10 transition-all duration-200"
          style={indicatorStyle}
        />
        {options.map((option, index) => (
          <label
            key={option.value}
            className="group relative flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors"
          >
            <span
              className={cn(
                'flex h-3.5 w-3.5 items-center justify-center rounded-full border transition-all duration-200',
                option.selected ? 'border-primary bg-primary' : 'border-muted-foreground/40 bg-transparent'
              )}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white transition-opacity duration-200" />
            </span>
            <span
              className={cn(
                'transition-colors duration-200',
                option.selected ? 'text-foreground' : 'text-muted-foreground'
              )}
            >
              {option.label}
            </span>
            <input
              type="radio"
              name={groupName}
              value={option.value}
              className="sr-only"
              checked={option.selected}
              onChange={() => onChange(option.value)}
            />
          </label>
        ))}
      </div>
    </Field>
  );
};

export default QualityVerificationToggle;

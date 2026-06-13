
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import { Colors } from '@/constants/theme';

// --- Constants
const CHART_HEIGHT = 160;
const CHART_H_LINES = 4;

const DASH_W = 4;
const DASH_GAP = 4;

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ─── Dashed line helpers ──────────────────────────────────────────────────────
function DashedHLine({ w, color = Colors.main.dashcolor }: { w: number; color?: string }) {
  const count = Math.floor(w / (DASH_W + DASH_GAP));
  return (
    <View style={{ flexDirection: 'row', height: 1 }}>
      {Array.from({ length: count }).map((_, i) => (
        <View
          key={i}
          style={{ width: DASH_W, height: 1, backgroundColor: color, marginRight: DASH_GAP }}
        />
      ))}
    </View>
  );
}

function DashedVLine({ h, color = Colors.main.dashcolor }: { h: number; color?: string }) {
  const count = Math.floor(h / (DASH_W + DASH_GAP));
  return (
    <View style={{ flexDirection: 'column', width: 1 }}>
      {Array.from({ length: count }).map((_, i) => (
        <View
          key={i}
          style={{ width: 1, height: DASH_W, backgroundColor: color, marginBottom: DASH_GAP }}
        />
      ))}
    </View>
  );
}


// ─── Chart component ──────────────────────────────────────────────────────────
interface ChartProps {
  monthIndices: number[];
  data: Record<number, number>;
  target: number;
  maxValue: number;
  currentMonthIdx: number;
  label: string;
  totalAmount: string;
  month:String;
  accentColor?: string;
}

export default function Chart({
  monthIndices,
  data,
  target,
  maxValue,
  currentMonthIdx,
  label,
  totalAmount,
  month,
  accentColor = Colors.main.red,
}: ChartProps) {
  const [selected, setSelected] = useState<{ index: number; x: number } | null>(null);

  // Chart width derived from container (card padding = 16 each side, card margin = 16 each side)
  const chartW = SCREEN_WIDTH - 32 - 32 - 2; // margins + padding + border wiggle

  const slotW = chartW / monthIndices.length;
  const targetY = (target / maxValue) * CHART_HEIGHT;

  const hLinePositions = Array.from(
    { length: CHART_H_LINES },
    (_, i) => ((i + 1) / (CHART_H_LINES + 1)) * CHART_HEIGHT
  );
  const vLinePositions = Array.from(
    { length: monthIndices.length - 1 },
    (_, i) => slotW * (i + 1)
  );

  const getBarHeight = (val: number) => (val / maxValue) * CHART_HEIGHT;

  const handlePress = (i: number) => {
    const val = data[monthIndices[i]] ?? 0;
    if (val === 0) { setSelected(null); return; }
    const cx = slotW * i + slotW / 2;
    setSelected(selected?.index === i ? null : { index: i, x: cx });
  };

  const handleTargetLinePress = () => {

  }

  const selVal = selected !== null ? (data[monthIndices[selected.index]] ?? 0) : 0;
  const diff = ((selVal - target) / target) * 100;
  const tooltipLabel = diff > 0
    ? `${Math.round(diff)}% over the target`
    : `${Math.round(Math.abs(diff))}% below the target`;
  const tooltipColor = diff > 0 ? Colors.main.red : Colors.main.green;

  const TOOLTIP_W = 155;
  const tooltipLeft = selected
    ? Math.max(0, Math.min(selected.x - TOOLTIP_W / 2, chartW - TOOLTIP_W))
    : 0;

  // Determine if a bar is the "current" month
  const isCurrentMonth = (i: number) => monthIndices[i] === currentMonthIdx;

  return (
    <TouchableWithoutFeedback onPress={() => setSelected(null)}>
      <View>
        {/* Chart area — clipped so grid lines never overflow */}
        <View style={[styles.chartOuter, { height: CHART_HEIGHT, width: chartW }]}>

          {/* Horizontal dashed lines */}
          {hLinePositions.map((y, i) => (
            <View key={`h${i}`} style={[styles.absPos, { top: y, left: 0, right: 0 }]} pointerEvents="none">
              <DashedHLine w={chartW} />
            </View>
          ))}

          {/* Vertical dashed lines */}
          {vLinePositions.map((x, i) => (
            <View key={`v${i}`} style={[styles.absPos, { left: x, top: 0, bottom: 0, alignItems: 'center' }]} pointerEvents="none">
              <DashedVLine h={CHART_HEIGHT} />
            </View>
          ))}

          {/* ── Red target line ── */}
          <View style={[styles.absPos, styles.targetLine, { bottom: targetY, backgroundColor: accentColor }]} pointerEvents="none" />

          {/* ── Target label ── */}
          <Text
            style={[styles.absPos, {
              bottom: targetY + 4,
              right: 4,
              fontSize: 10,
              fontWeight: '600',
              color: accentColor,
            }]}
            pointerEvents="none"
          >
            ${target}
          </Text>

          {/* Bars */}
          <View style={[styles.absPos, styles.barsRow]}>
            {monthIndices.map((mIdx, i) => {
              const val = data[mIdx] ?? 0;
              const bh = getBarHeight(val);
              const isSelected = selected?.index === i;
              const isCurrent = isCurrentMonth(i);
              return (
                <TouchableOpacity
                  key={mIdx}
                  style={styles.barSlot}
                  onPress={() => handlePress(i)}
                  activeOpacity={0.8}
                >
                  {val > 0 && (
                    <View
                      style={[
                        styles.bar,
                        {
                          height: bh,
                          backgroundColor: isSelected
                            ? '#5bbcd6'
                            : isCurrent
                            ? '#82cfe0'
                            : '#b3e0f2',
                        },
                      ]}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Tooltip */}
          {selected !== null && selVal > 0 && (
            <View
              style={[styles.tooltip, { left: tooltipLeft }]}
              onStartShouldSetResponder={() => true}
            >
              <Text style={styles.tooltipTitle}>{label}</Text>
              <Text style={styles.tooltipAmount}>${selVal.toFixed(2)}</Text>
              <Text style={[styles.tooltipSub, { color: tooltipColor }]}>{tooltipLabel}</Text>
            </View>
          )}
        </View>

        {/* X labels */}
        <View style={[styles.labelsRow, { width: chartW }]}>
          {monthIndices.map((mIdx) => (
            <View key={mIdx} style={styles.labelSlot}>
              <Text style={styles.labelText}>{month}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  // Chart internals
  chartOuter: {
    overflow: 'hidden',
    position: 'relative',
  },
  absPos: {
    position: 'absolute',
  },
  targetLine: {
    left: 0,
    right: 0,
    height: 2,
    zIndex: 3,
  },
  barsRow: {
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
    zIndex: 2,
  },
  barSlot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '100%',
    paddingHorizontal: 3,
  },
  bar: {
    width: '100%',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },

  // Tooltip
  tooltip: {
    position: 'absolute',
    top: 0,
    width: 155,
    backgroundColor: '#d4d4d4',
    borderRadius: 12,
    padding: 10,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 8,
  },
  tooltipTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#222',
    marginBottom: 1,
  },
  tooltipAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
    marginBottom: 2,
  },
  tooltipSub: {
    fontSize: 10,
    fontWeight: '500',
  },

  

  // X-axis labels
  labelsRow: {
    flexDirection: 'row',
    marginTop: 6,
  },
  labelSlot: {
    flex: 1,
    alignItems: 'center',
  },
  labelText: {
    fontSize: 11,
    color: '#666',
  },
})
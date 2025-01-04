import { colors } from "./colors";

export const lightTheme: Highcharts.Options = {
  colors: ['#4caefe',
    '#3fbdf3',
    '#35c3e8',
    '#2bc9dc',
    '#20cfe1',
    '#16d4e6',
    '#0dd9db',
    '#03dfd0',
    '#00e4c5',
    '#00e9ba',
    '#00eeaf',
    '#23e274'],
  chart: {
    backgroundColor: colors.fgLight,
    style: {
      fontFamily: 'JetBrains Mono',
      background: colors.fgLight
    }
  },
  title: {
    style: {
      color: colors.textMutedLight,
    }
  },
  subtitle: {
    style: {
      color: colors.textMutedLight,
    }
  },
  xAxis: {
    gridLineColor: colors.textMutedLight,
    labels: {
      style: {
        color: colors.textLight
      }
    },
    lineColor: colors.textLight,
    title: {
      style: {
        color: colors.textLight
      }
    }
  },
  yAxis: {
    gridLineColor: colors.textMutedLight,
    labels: {
      style: {
        color: colors.textLight
      }
    },
    lineColor: colors.textLight,
    title: {
      style: {
        color: colors.textLight
      }
    }
  },
  tooltip: {
    backgroundColor: colors.bgLight,
    borderColor: colors.textMutedLight,
    style: {
      color: colors.textLight
    }
  },
  legend: {
    itemStyle: {
      color: colors.textLight
    },
    itemHoverStyle: {
      color: colors.primary
    }
  },
  credits: {
    enabled: false
  }
};

export const darkTheme: Highcharts.Options = {
  colors: ['#4caefe',
    '#3fbdf3',
    '#35c3e8',
    '#2bc9dc',
    '#20cfe1',
    '#16d4e6',
    '#0dd9db',
    '#03dfd0',
    '#00e4c5',
    '#00e9ba',
    '#00eeaf',
    '#23e274'],
  chart: {
    backgroundColor: colors.fgDark,
    style: {
      fontFamily: 'JetBrains Mono',
    }
  },
  title: {
    style: {
      color: colors.textMutedDark,
    }
  },
  subtitle: {
    style: {
      color: colors.textMutedDark,
    }
  },
  xAxis: {
    gridLineColor: colors.textMutedDark,
    labels: {
      style: {
        color: colors.textDark
      }
    },
    lineColor: colors.textDark,
    title: {
      style: {
        color: colors.textDark
      }
    }
  },
  yAxis: {
    gridLineColor: colors.textMutedDark,
    labels: {
      style: {
        color: colors.textDark
      }
    },
    lineColor: colors.textDark,
    title: {
      style: {
        color: colors.textDark
      }
    }
  },
  tooltip: {
    backgroundColor: colors.bgDark,
    borderColor: colors.textMutedDark,
    style: {
      color: colors.textDark
    }
  },
  legend: {
    itemStyle: {
      color: colors.textDark
    },
    itemHoverStyle: {
      color: colors.primary
    }
  },
  credits: {
    enabled: false
  }
};


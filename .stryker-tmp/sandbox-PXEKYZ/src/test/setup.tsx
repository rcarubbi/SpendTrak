// @ts-nocheck
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
import "@testing-library/jest-dom/vitest";
Object.defineProperty(window, stryMutAct_9fa48("2445") ? "" : (stryCov_9fa48("2445"), "matchMedia"), stryMutAct_9fa48("2446") ? {} : (stryCov_9fa48("2446"), {
  writable: stryMutAct_9fa48("2447") ? false : (stryCov_9fa48("2447"), true),
  value: stryMutAct_9fa48("2448") ? () => undefined : (stryCov_9fa48("2448"), (query: string) => stryMutAct_9fa48("2449") ? {} : (stryCov_9fa48("2449"), {
    matches: stryMutAct_9fa48("2450") ? true : (stryCov_9fa48("2450"), false),
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(stryMutAct_9fa48("2451") ? () => undefined : (stryCov_9fa48("2451"), () => stryMutAct_9fa48("2452") ? true : (stryCov_9fa48("2452"), false)))
  }))
}));
Object.defineProperty(window, stryMutAct_9fa48("2453") ? "" : (stryCov_9fa48("2453"), "showDirectoryPicker"), stryMutAct_9fa48("2454") ? {} : (stryCov_9fa48("2454"), {
  writable: stryMutAct_9fa48("2455") ? false : (stryCov_9fa48("2455"), true),
  value: stryMutAct_9fa48("2456") ? () => undefined : (stryCov_9fa48("2456"), () => Promise.reject(new DOMException(stryMutAct_9fa48("2457") ? "" : (stryCov_9fa48("2457"), "Not supported"), stryMutAct_9fa48("2458") ? "" : (stryCov_9fa48("2458"), "AbortError"))))
}));
class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;
vi.mock(stryMutAct_9fa48("2459") ? "" : (stryCov_9fa48("2459"), "ag-grid-community"), () => {
  if (stryMutAct_9fa48("2460")) {
    {}
  } else {
    stryCov_9fa48("2460");
    const ModuleRegistry = stryMutAct_9fa48("2461") ? {} : (stryCov_9fa48("2461"), {
      registerModules: vi.fn()
    });
    const themeQuartz = stryMutAct_9fa48("2462") ? {} : (stryCov_9fa48("2462"), {
      withParams: stryMutAct_9fa48("2463") ? () => undefined : (stryCov_9fa48("2463"), () => themeQuartz)
    });
    return stryMutAct_9fa48("2464") ? {} : (stryCov_9fa48("2464"), {
      ModuleRegistry,
      themeQuartz,
      ClientSideRowModelModule: {},
      CsvExportModule: {},
      RowStyleModule: {}
    });
  }
});
vi.mock(stryMutAct_9fa48("2465") ? "" : (stryCov_9fa48("2465"), "ag-grid-react"), async () => {
  if (stryMutAct_9fa48("2466")) {
    {}
  } else {
    stryCov_9fa48("2466");
    const React = await import("react");
    const MockAgGrid = stryMutAct_9fa48("2467") ? () => undefined : (stryCov_9fa48("2467"), (() => {
      const MockAgGrid = ({
        rowData,
        columnDefs
      }: Record<string, unknown>) => React.createElement(stryMutAct_9fa48("2468") ? "" : (stryCov_9fa48("2468"), "div"), stryMutAct_9fa48("2469") ? {} : (stryCov_9fa48("2469"), {
        "data-testid": stryMutAct_9fa48("2470") ? "" : (stryCov_9fa48("2470"), "ag-grid"),
        "data-rows": JSON.stringify(rowData),
        "data-columns": JSON.stringify(columnDefs)
      }));
      return MockAgGrid;
    })());
    return stryMutAct_9fa48("2471") ? {} : (stryCov_9fa48("2471"), {
      AgGridReact: MockAgGrid,
      default: MockAgGrid
    });
  }
});
vi.mock(stryMutAct_9fa48("2472") ? "" : (stryCov_9fa48("2472"), "recharts"), async () => {
  if (stryMutAct_9fa48("2473")) {
    {}
  } else {
    stryCov_9fa48("2473");
    const React = await import("react");
    const mkEl = stryMutAct_9fa48("2474") ? () => undefined : (stryCov_9fa48("2474"), (() => {
      const mkEl = (testId: string) => stryMutAct_9fa48("2475") ? () => undefined : (stryCov_9fa48("2475"), (props: Record<string, unknown>) => React.createElement(stryMutAct_9fa48("2476") ? "" : (stryCov_9fa48("2476"), "div"), stryMutAct_9fa48("2477") ? {} : (stryCov_9fa48("2477"), {
        "data-testid": testId,
        "data-props": JSON.stringify(props)
      })));
      return mkEl;
    })());
    const section = stryMutAct_9fa48("2478") ? () => undefined : (stryCov_9fa48("2478"), (() => {
      const section = (testId: string) => stryMutAct_9fa48("2479") ? () => undefined : (stryCov_9fa48("2479"), ({
        children
      }: {
        children?: React.ReactNode;
      }) => React.createElement(stryMutAct_9fa48("2480") ? "" : (stryCov_9fa48("2480"), "div"), stryMutAct_9fa48("2481") ? {} : (stryCov_9fa48("2481"), {
        "data-testid": testId
      }), children));
      return section;
    })());
    return stryMutAct_9fa48("2482") ? {} : (stryCov_9fa48("2482"), {
      ResponsiveContainer: section(stryMutAct_9fa48("2483") ? "" : (stryCov_9fa48("2483"), "responsive-container")),
      PieChart: section(stryMutAct_9fa48("2484") ? "" : (stryCov_9fa48("2484"), "pie-chart")),
      Pie: stryMutAct_9fa48("2485") ? () => undefined : (stryCov_9fa48("2485"), ({
        children,
        ...props
      }: Record<string, unknown>) => React.createElement(stryMutAct_9fa48("2486") ? "" : (stryCov_9fa48("2486"), "div"), stryMutAct_9fa48("2487") ? {} : (stryCov_9fa48("2487"), {
        "data-testid": stryMutAct_9fa48("2488") ? "" : (stryCov_9fa48("2488"), "pie"),
        "data-props": JSON.stringify(props)
      }), children)),
      Cell: mkEl(stryMutAct_9fa48("2489") ? "" : (stryCov_9fa48("2489"), "cell")),
      BarChart: section(stryMutAct_9fa48("2490") ? "" : (stryCov_9fa48("2490"), "bar-chart")),
      Bar: mkEl(stryMutAct_9fa48("2491") ? "" : (stryCov_9fa48("2491"), "bar")),
      XAxis: mkEl(stryMutAct_9fa48("2492") ? "" : (stryCov_9fa48("2492"), "xaxis")),
      YAxis: mkEl(stryMutAct_9fa48("2493") ? "" : (stryCov_9fa48("2493"), "yaxis")),
      CartesianGrid: mkEl(stryMutAct_9fa48("2494") ? "" : (stryCov_9fa48("2494"), "cartesian-grid")),
      Tooltip: mkEl(stryMutAct_9fa48("2495") ? "" : (stryCov_9fa48("2495"), "tooltip")),
      Legend: mkEl(stryMutAct_9fa48("2496") ? "" : (stryCov_9fa48("2496"), "legend"))
    });
  }
});
vi.mock(stryMutAct_9fa48("2497") ? "" : (stryCov_9fa48("2497"), "../utils/fileSystem"), stryMutAct_9fa48("2498") ? () => undefined : (stryCov_9fa48("2498"), () => stryMutAct_9fa48("2499") ? {} : (stryCov_9fa48("2499"), {
  readJSON: vi.fn().mockResolvedValue(null),
  writeJSON: vi.fn().mockResolvedValue(undefined),
  ensureDataDir: vi.fn().mockResolvedValue(stryMutAct_9fa48("2500") ? false : (stryCov_9fa48("2500"), true)),
  pickDataDir: vi.fn().mockResolvedValue(undefined),
  writeMonthData: vi.fn().mockResolvedValue(undefined),
  listAllMonthData: vi.fn().mockResolvedValue(stryMutAct_9fa48("2501") ? ["Stryker was here"] : (stryCov_9fa48("2501"), [])),
  readMonthData: vi.fn().mockResolvedValue(null),
  listMonthFiles: vi.fn().mockResolvedValue(stryMutAct_9fa48("2502") ? ["Stryker was here"] : (stryCov_9fa48("2502"), []))
})));
vi.mock(stryMutAct_9fa48("2503") ? "" : (stryCov_9fa48("2503"), "react-hot-toast"), async () => {
  if (stryMutAct_9fa48("2504")) {
    {}
  } else {
    stryCov_9fa48("2504");
    const React = await import("react");
    const MockToaster = stryMutAct_9fa48("2505") ? () => undefined : (stryCov_9fa48("2505"), (() => {
      const MockToaster = () => React.createElement(stryMutAct_9fa48("2506") ? "" : (stryCov_9fa48("2506"), "div"), stryMutAct_9fa48("2507") ? {} : (stryCov_9fa48("2507"), {
        "data-testid": stryMutAct_9fa48("2508") ? "" : (stryCov_9fa48("2508"), "toaster")
      }));
      return MockToaster;
    })());
    return stryMutAct_9fa48("2509") ? {} : (stryCov_9fa48("2509"), {
      default: stryMutAct_9fa48("2510") ? {} : (stryCov_9fa48("2510"), {
        success: vi.fn(),
        error: vi.fn(),
        custom: vi.fn(),
        dismiss: vi.fn()
      }),
      Toaster: MockToaster
    });
  }
});
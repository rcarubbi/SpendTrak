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
Object.defineProperty(window, stryMutAct_9fa48("2387") ? "" : (stryCov_9fa48("2387"), "matchMedia"), stryMutAct_9fa48("2388") ? {} : (stryCov_9fa48("2388"), {
  writable: stryMutAct_9fa48("2389") ? false : (stryCov_9fa48("2389"), true),
  value: stryMutAct_9fa48("2390") ? () => undefined : (stryCov_9fa48("2390"), (query: string) => stryMutAct_9fa48("2391") ? {} : (stryCov_9fa48("2391"), {
    matches: stryMutAct_9fa48("2392") ? true : (stryCov_9fa48("2392"), false),
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(stryMutAct_9fa48("2393") ? () => undefined : (stryCov_9fa48("2393"), () => stryMutAct_9fa48("2394") ? true : (stryCov_9fa48("2394"), false)))
  }))
}));
Object.defineProperty(window, stryMutAct_9fa48("2395") ? "" : (stryCov_9fa48("2395"), "showDirectoryPicker"), stryMutAct_9fa48("2396") ? {} : (stryCov_9fa48("2396"), {
  writable: stryMutAct_9fa48("2397") ? false : (stryCov_9fa48("2397"), true),
  value: stryMutAct_9fa48("2398") ? () => undefined : (stryCov_9fa48("2398"), () => Promise.reject(new DOMException(stryMutAct_9fa48("2399") ? "" : (stryCov_9fa48("2399"), "Not supported"), stryMutAct_9fa48("2400") ? "" : (stryCov_9fa48("2400"), "AbortError"))))
}));
class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;
vi.mock(stryMutAct_9fa48("2401") ? "" : (stryCov_9fa48("2401"), "ag-grid-community"), () => {
  if (stryMutAct_9fa48("2402")) {
    {}
  } else {
    stryCov_9fa48("2402");
    const ModuleRegistry = stryMutAct_9fa48("2403") ? {} : (stryCov_9fa48("2403"), {
      registerModules: vi.fn()
    });
    const themeQuartz = stryMutAct_9fa48("2404") ? {} : (stryCov_9fa48("2404"), {
      withParams: stryMutAct_9fa48("2405") ? () => undefined : (stryCov_9fa48("2405"), () => themeQuartz)
    });
    return stryMutAct_9fa48("2406") ? {} : (stryCov_9fa48("2406"), {
      ModuleRegistry,
      themeQuartz,
      ClientSideRowModelModule: {},
      CsvExportModule: {},
      RowStyleModule: {}
    });
  }
});
vi.mock(stryMutAct_9fa48("2407") ? "" : (stryCov_9fa48("2407"), "ag-grid-react"), async () => {
  if (stryMutAct_9fa48("2408")) {
    {}
  } else {
    stryCov_9fa48("2408");
    const React = await import("react");
    const MockAgGrid = stryMutAct_9fa48("2409") ? () => undefined : (stryCov_9fa48("2409"), (() => {
      const MockAgGrid = ({
        rowData,
        columnDefs
      }: Record<string, unknown>) => React.createElement(stryMutAct_9fa48("2410") ? "" : (stryCov_9fa48("2410"), "div"), stryMutAct_9fa48("2411") ? {} : (stryCov_9fa48("2411"), {
        "data-testid": stryMutAct_9fa48("2412") ? "" : (stryCov_9fa48("2412"), "ag-grid"),
        "data-rows": JSON.stringify(rowData),
        "data-columns": JSON.stringify(columnDefs)
      }));
      return MockAgGrid;
    })());
    return stryMutAct_9fa48("2413") ? {} : (stryCov_9fa48("2413"), {
      AgGridReact: MockAgGrid,
      default: MockAgGrid
    });
  }
});
vi.mock(stryMutAct_9fa48("2414") ? "" : (stryCov_9fa48("2414"), "recharts"), async () => {
  if (stryMutAct_9fa48("2415")) {
    {}
  } else {
    stryCov_9fa48("2415");
    const React = await import("react");
    const mkEl = stryMutAct_9fa48("2416") ? () => undefined : (stryCov_9fa48("2416"), (() => {
      const mkEl = (testId: string) => stryMutAct_9fa48("2417") ? () => undefined : (stryCov_9fa48("2417"), (props: Record<string, unknown>) => React.createElement(stryMutAct_9fa48("2418") ? "" : (stryCov_9fa48("2418"), "div"), stryMutAct_9fa48("2419") ? {} : (stryCov_9fa48("2419"), {
        "data-testid": testId,
        "data-props": JSON.stringify(props)
      })));
      return mkEl;
    })());
    const section = stryMutAct_9fa48("2420") ? () => undefined : (stryCov_9fa48("2420"), (() => {
      const section = (testId: string) => stryMutAct_9fa48("2421") ? () => undefined : (stryCov_9fa48("2421"), ({
        children
      }: {
        children?: React.ReactNode;
      }) => React.createElement(stryMutAct_9fa48("2422") ? "" : (stryCov_9fa48("2422"), "div"), stryMutAct_9fa48("2423") ? {} : (stryCov_9fa48("2423"), {
        "data-testid": testId
      }), children));
      return section;
    })());
    return stryMutAct_9fa48("2424") ? {} : (stryCov_9fa48("2424"), {
      ResponsiveContainer: section(stryMutAct_9fa48("2425") ? "" : (stryCov_9fa48("2425"), "responsive-container")),
      PieChart: section(stryMutAct_9fa48("2426") ? "" : (stryCov_9fa48("2426"), "pie-chart")),
      Pie: stryMutAct_9fa48("2427") ? () => undefined : (stryCov_9fa48("2427"), ({
        children,
        ...props
      }: Record<string, unknown>) => React.createElement(stryMutAct_9fa48("2428") ? "" : (stryCov_9fa48("2428"), "div"), stryMutAct_9fa48("2429") ? {} : (stryCov_9fa48("2429"), {
        "data-testid": stryMutAct_9fa48("2430") ? "" : (stryCov_9fa48("2430"), "pie"),
        "data-props": JSON.stringify(props)
      }), children)),
      Cell: mkEl(stryMutAct_9fa48("2431") ? "" : (stryCov_9fa48("2431"), "cell")),
      BarChart: section(stryMutAct_9fa48("2432") ? "" : (stryCov_9fa48("2432"), "bar-chart")),
      Bar: mkEl(stryMutAct_9fa48("2433") ? "" : (stryCov_9fa48("2433"), "bar")),
      XAxis: mkEl(stryMutAct_9fa48("2434") ? "" : (stryCov_9fa48("2434"), "xaxis")),
      YAxis: mkEl(stryMutAct_9fa48("2435") ? "" : (stryCov_9fa48("2435"), "yaxis")),
      CartesianGrid: mkEl(stryMutAct_9fa48("2436") ? "" : (stryCov_9fa48("2436"), "cartesian-grid")),
      Tooltip: mkEl(stryMutAct_9fa48("2437") ? "" : (stryCov_9fa48("2437"), "tooltip")),
      Legend: mkEl(stryMutAct_9fa48("2438") ? "" : (stryCov_9fa48("2438"), "legend"))
    });
  }
});
vi.mock(stryMutAct_9fa48("2439") ? "" : (stryCov_9fa48("2439"), "../utils/fileSystem"), stryMutAct_9fa48("2440") ? () => undefined : (stryCov_9fa48("2440"), () => stryMutAct_9fa48("2441") ? {} : (stryCov_9fa48("2441"), {
  readJSON: vi.fn().mockResolvedValue(null),
  writeJSON: vi.fn().mockResolvedValue(undefined),
  ensureDataDir: vi.fn().mockResolvedValue(stryMutAct_9fa48("2442") ? false : (stryCov_9fa48("2442"), true)),
  pickDataDir: vi.fn().mockResolvedValue(undefined),
  writeMonthData: vi.fn().mockResolvedValue(undefined),
  listAllMonthData: vi.fn().mockResolvedValue(stryMutAct_9fa48("2443") ? ["Stryker was here"] : (stryCov_9fa48("2443"), [])),
  readMonthData: vi.fn().mockResolvedValue(null),
  listMonthFiles: vi.fn().mockResolvedValue(stryMutAct_9fa48("2444") ? ["Stryker was here"] : (stryCov_9fa48("2444"), []))
})));
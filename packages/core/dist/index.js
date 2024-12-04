"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  PivotEngine: () => PivotEngine
});
module.exports = __toCommonJS(src_exports);

// src/engine/aggregator.ts
function aggregate(data, field, type) {
  const values = data.map((item) => item[field]);
  switch (type) {
    case "sum":
      return values.reduce((a, b) => a + b, 0);
    case "avg":
      return values.reduce((a, b) => a + b, 0) / values.length;
    case "count":
      return values.length;
    case "min":
      return Math.min(...values);
    case "max":
      return Math.max(...values);
    default:
      throw new Error(`Unsupported aggregation type: ${type}`);
  }
}

// src/engine/dataProcessor.ts
function processData(data, dimensions, measures) {
  const processedRows = [];
  const dimensionFields = dimensions.map((d) => d.field);
  const groupedData = groupData(data, dimensionFields);
  processGroup(groupedData, dimensionFields, measures, processedRows);
  return processedRows;
}
function groupData(data, fields) {
  const groupedData = /* @__PURE__ */ new Map();
  for (const item of data) {
    const key = fields.map((field) => item[field]).join("|");
    if (!groupedData.has(key)) {
      groupedData.set(key, []);
    }
    groupedData.get(key).push(item);
  }
  return groupedData;
}
function processGroup(group, dimensions, measures, result, level = 0, parentId = "") {
  for (const [key, items] of group.entries()) {
    const dimensionValues = key.split("|");
    const id = parentId ? `${parentId}-${key}` : key;
    const row = {
      id,
      level,
      isExpanded: false,
      parentId: parentId || void 0,
      dimensions: Object.fromEntries(dimensions.map((d, i) => [d, dimensionValues[i]])),
      measures: Object.fromEntries(measures.map((m) => [
        m.field,
        aggregate(items, m.field, m.aggregationType)
      ])),
      originalData: items
    };
    result.push(row);
    if (level < dimensions.length - 1) {
      const nextGroup = groupData(items, dimensions.slice(level + 1));
      processGroup(nextGroup, dimensions, measures, result, level + 1, id);
    }
  }
}

// src/engine/sorter.ts
function applySort(rows, sortConfig) {
  return [...rows].sort((a, b) => {
    const aValue = getValue(a, sortConfig.field);
    const bValue = getValue(b, sortConfig.field);
    if (aValue < bValue)
      return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue)
      return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });
}
function getValue(row, field) {
  var _a;
  return (_a = row.dimensions[field]) != null ? _a : row.measures[field];
}

// src/engine/filter.ts
function applyFilter(rows, filterConfig) {
  return rows.filter((row) => {
    var _a;
    const value = (_a = row.dimensions[filterConfig.field]) != null ? _a : row.measures[filterConfig.field];
    return value === filterConfig.value;
  });
}

// src/engine/pivotEngine.ts
var PivotEngine = class {
  constructor(config) {
    this.config = config;
    this.state = {
      rows: [],
      columns: [],
      expandedNodes: /* @__PURE__ */ new Set(),
      sortConfig: null,
      filterConfig: null
    };
    this.processData();
  }
  processData() {
    this.state.rows = processData(this.config.data, this.config.dimensions, this.config.measures);
    this.applyStateChanges();
  }
  applyStateChanges() {
    if (this.state.sortConfig) {
      this.state.rows = applySort(this.state.rows, this.state.sortConfig);
    }
    if (this.state.filterConfig) {
      this.state.rows = applyFilter(this.state.rows, this.state.filterConfig);
    }
  }
  toggleExpand(rowId) {
    if (this.state.expandedNodes.has(rowId)) {
      this.state.expandedNodes.delete(rowId);
    } else {
      this.state.expandedNodes.add(rowId);
    }
    this.processData();
  }
  sort(field, direction) {
    this.state.sortConfig = { field, direction };
    this.applyStateChanges();
  }
  filter(field, value) {
    this.state.filterConfig = { field, value };
    this.applyStateChanges();
  }
  getState() {
    return __spreadValues({}, this.state);
  }
  reset() {
    this.state.sortConfig = null;
    this.state.filterConfig = null;
    this.state.expandedNodes.clear();
    this.processData();
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PivotEngine
});

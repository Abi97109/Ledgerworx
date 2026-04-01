<?php include __DIR__ . '/../php/header.php'; ?>

<div class="page payments-page-v2">
  <div class="payp-topbar">
    <h2>Payments & Reports</h2>
    <div class="payp-top-actions">
      <button type="button" class="payp-top-btn">Export as CSV</button>
      <button type="button" class="payp-top-btn">Export as PDF</button>
      <button type="button" class="payp-top-btn">Download Invoice</button>
    </div>
  </div>

  <section class="payp-kpi-grid">
    <article class="payp-kpi payp-kpi-revenue">
      <div class="payp-kpi-head">
        <span class="payp-kpi-icon"><i class="fa-solid fa-bolt"></i></span>
        <span>Total Revenue</span>
      </div>
      <div class="payp-kpi-value">AED 82,500</div>
      <div class="payp-kpi-meta"><i class="fa-solid fa-circle"></i> Invoice</div>
    </article>
    <article class="payp-kpi payp-kpi-pending">
      <div class="payp-kpi-head">
        <span class="payp-kpi-icon"><i class="fa-solid fa-hourglass-half"></i></span>
        <span>Pending Payments</span>
      </div>
      <div class="payp-kpi-value">AED 8,700</div>
      <div class="payp-kpi-meta"><i class="fa-solid fa-circle"></i> Invoice</div>
    </article>
    <article class="payp-kpi payp-kpi-paid">
      <div class="payp-kpi-head">
        <span class="payp-kpi-icon"><i class="fa-solid fa-check"></i></span>
        <span>Paid Invoices</span>
      </div>
      <div class="payp-kpi-value">AED 65,800</div>
      <div class="payp-kpi-meta"><i class="fa-solid fa-circle"></i> Paid Invoices</div>
    </article>
    <article class="payp-kpi payp-kpi-overdue">
      <div class="payp-kpi-head">
        <span class="payp-kpi-icon"><i class="fa-solid fa-exclamation"></i></span>
        <span>Overdue Payments</span>
      </div>
      <div class="payp-kpi-value">AED 8,000</div>
      <div class="payp-kpi-meta"><i class="fa-solid fa-circle"></i> Overdue</div>
    </article>
  </section>

  <div class="payp-layout">
    <section class="payp-left-panel">
      <div class="payp-filter-wrap">
        <div class="payp-filter-row">
          <div class="payp-control">
            <label>Type</label>
            <select>
              <option>All</option>
              <option>Invoice</option>
              <option>Credit Note</option>
            </select>
          </div>
          <div class="payp-control">
            <label>Status</label>
            <select>
              <option>All</option>
              <option>Created</option>
              <option>Paid</option>
              <option>Overdue</option>
            </select>
          </div>
          <div class="payp-control payp-control-wide">
            <label>Date Range</label>
            <input type="text" placeholder="Date Range..">
          </div>
          <button type="button" class="payp-mini-btn"><i class="fa-solid fa-ellipsis"></i></button>
        </div>
        <div class="payp-filter-row">
          <div class="payp-control">
            <label>Status</label>
            <select>
              <option>All</option>
              <option>Created</option>
              <option>Paid</option>
              <option>Overdue</option>
            </select>
          </div>
          <div class="payp-control">
            <label>Customer</label>
            <input type="text" placeholder="Customer">
          </div>
          <div class="payp-control">
            <label>Customer</label>
            <select>
              <option>Customer</option>
              <option>Qubicle Technologies LLC</option>
              <option>FutureTech Solutions</option>
              <option>Global Electronics</option>
            </select>
          </div>
          <button type="button" class="payp-mini-btn">Clear</button>
        </div>
      </div>

      <div class="payp-table-wrap">
        <table class="payp-table">
          <colgroup>
            <col class="payp-col-customer">
            <col class="payp-col-type">
            <col class="payp-col-date">
            <col class="payp-col-status">
            <col class="payp-col-amount">
            <col class="payp-col-assigned">
            <col class="payp-col-action">
          </colgroup>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Type</th>
              <th>Date</th>
              <th>Status</th>
              <th>Amount (AED)</th>
              <th>Assigned To</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr class="payp-row active"
                data-customer="Qubicle Technologies LLC"
                data-type="Invoice"
                data-invoice="INV-00255"
                data-status="Created"
                data-invoice-id="INV-00255"
                data-due-date="18/10/2025"
                data-entry-date="18/10/2025"
                data-item-label="Appliance Repair"
                data-item-amount="AED 2,000"
                data-discount="AED 2,000"
                data-tax="00"
                data-adjustment="AED 2,000"
                data-total="AED 2,000">
              <td>Qubicle Technologies LLC</td>
              <td>Invoice</td>
              <td>18/10/2025</td>
              <td><span class="payp-status-tag created payp-status-text">Created</span></td>
              <td>AED 2,000</td>
              <td class="payp-assigned">Arun Paul</td>
              <td class="payp-action-cell"><button type="button" class="payp-dot-btn"><i class="fa-solid fa-ellipsis"></i></button></td>
            </tr>
            <tr class="payp-row"
                data-customer="FutureTech Solutions"
                data-type="Invoice"
                data-invoice="INV-00263"
                data-status="Paid"
                data-invoice-id="INV-00263"
                data-due-date="19/06/2025"
                data-entry-date="19/06/2025"
                data-item-label="Annual Maintenance"
                data-item-amount="AED 7,800"
                data-discount="AED 0"
                data-tax="0"
                data-adjustment="AED 0"
                data-total="AED 7,800">
              <td>FutureTech Solutions</td>
              <td>Invoice</td>
              <td>19/06/2025</td>
              <td><span class="payp-status-tag paid payp-status-text"><i class="fa-solid fa-circle-check"></i> Paid</span></td>
              <td>AED 7,800</td>
              <td class="payp-assigned">Priyanka Das</td>
              <td class="payp-action-cell"><button type="button" class="payp-dot-btn"><i class="fa-solid fa-ellipsis"></i></button></td>
            </tr>
            <tr class="payp-row"
                data-customer="Global Electronics"
                data-type="Invoice"
                data-invoice="INV-00198"
                data-status="Paid"
                data-invoice-id="INV-00198"
                data-due-date="18/06/2025"
                data-entry-date="18/06/2025"
                data-item-label="Device Replacement"
                data-item-amount="AED 5,900"
                data-discount="AED 0"
                data-tax="0"
                data-adjustment="AED 0"
                data-total="AED 5,900">
              <td>Global Electronics</td>
              <td>Invoice</td>
              <td>18/06/2025</td>
              <td><span class="payp-status-tag paid payp-status-text"><i class="fa-solid fa-circle-check"></i> Paid</span></td>
              <td>AED 5,900</td>
              <td class="payp-assigned">Sameer Khan</td>
              <td class="payp-action-cell"><button type="button" class="payp-dot-btn"><i class="fa-solid fa-ellipsis"></i></button></td>
            </tr>
          </tbody>
        </table>

        <div class="payp-table-footer">
          <div class="payp-record-count">1-5 of 50 records</div>
          <div class="payp-footer-controls">
            <button type="button" class="payp-nav-btn"><i class="fa-solid fa-backward-step"></i></button>
            <button type="button" class="payp-nav-btn"><i class="fa-solid fa-caret-left"></i></button>
            <span class="payp-page-pill">10</span>
            <button type="button" class="payp-nav-btn"><i class="fa-solid fa-caret-right"></i></button>
            <button type="button" class="payp-nav-btn"><i class="fa-solid fa-forward-step"></i></button>
            <select class="payp-page-size">
              <option>10 Items/page</option>
              <option>20 Items/page</option>
              <option>50 Items/page</option>
            </select>
          </div>
        </div>
      </div>
    </section>

    <aside class="payp-right-panel">
      <div class="payp-info-head">
        <h3>Payment Information</h3>
        <button type="button" id="paypMarkAsPaidBtn" class="payp-primary-btn">Mark as Paid</button>
      </div>

      <div class="payp-customer-block">
        <div class="payp-label">Customer Name</div>
        <div id="paypCustomerName" class="payp-customer-name">Qubicle Technologies LLC</div>
      </div>

      <div class="payp-info-grid">
        <div>
          <div class="payp-label">Type</div>
          <div id="paypTypeValue" class="payp-value">Invoice</div>
        </div>
        <div>
          <div class="payp-label">Invoice</div>
          <div id="paypInvoiceValue" class="payp-value">INV-00255</div>
        </div>
        <div>
          <div class="payp-label">Status</div>
          <div id="paypStatusValue" class="payp-value">Created</div>
        </div>
        <div>
          <div class="payp-label">Invoice ID</div>
          <div id="paypInvoiceIdValue" class="payp-value">INV-00255</div>
        </div>
        <div>
          <div class="payp-label">Due Date</div>
          <div id="paypDueDateValue" class="payp-value">18/10/2025</div>
        </div>
        <div>
          <div class="payp-label">Date</div>
          <div id="paypDateValue" class="payp-value">18/10/2025</div>
        </div>
      </div>

      <div class="payp-items-panel">
        <div class="payp-items-title">Items</div>
        <div class="payp-item-row"><span id="paypItemLabel">Appliance Repair</span><strong id="paypItemAmount">AED 2,000</strong></div>
        <div class="payp-item-row"><span>Discount</span><strong id="paypDiscountAmount">AED 2,000</strong></div>
        <div class="payp-item-row"><span>Tax(AED)</span><strong id="paypTaxAmount">00</strong></div>
        <div class="payp-item-row"><span>Adjustment (AED)</span><strong id="paypAdjustmentAmount">AED 2,000</strong></div>
        <div class="payp-item-row total"><span>Grand Total</span><strong id="paypGrandTotal">AED 2,000</strong></div>
      </div>

      <button type="button" class="payp-record-btn">Record Payment</button>

      <div class="payp-side-actions">
        <button type="button" class="payp-side-btn"><i class="fa-regular fa-envelope"></i> Send Invoice</button>
        <button type="button" class="payp-side-btn"><i class="fa-regular fa-file-lines"></i> Download PDF</button>
      </div>

      <div class="payp-side-actions">
        <button type="button" class="payp-side-btn"><i class="fa-solid fa-file-export"></i> Export</button>
        <select class="payp-csv-select">
          <option>CSV</option>
          <option>PDF</option>
        </select>
      </div>
    </aside>
  </div>
</div>

<script>
  (function () {
    const rows = Array.from(document.querySelectorAll(".payp-row"));
    const markAsPaidBtn = document.getElementById("paypMarkAsPaidBtn");

    const refs = {
      customer: document.getElementById("paypCustomerName"),
      type: document.getElementById("paypTypeValue"),
      invoice: document.getElementById("paypInvoiceValue"),
      status: document.getElementById("paypStatusValue"),
      invoiceId: document.getElementById("paypInvoiceIdValue"),
      dueDate: document.getElementById("paypDueDateValue"),
      date: document.getElementById("paypDateValue"),
      itemLabel: document.getElementById("paypItemLabel"),
      itemAmount: document.getElementById("paypItemAmount"),
      discount: document.getElementById("paypDiscountAmount"),
      tax: document.getElementById("paypTaxAmount"),
      adjustment: document.getElementById("paypAdjustmentAmount"),
      total: document.getElementById("paypGrandTotal")
    };

    function applyRowData(row) {
      refs.customer.textContent = row.dataset.customer || "-";
      refs.type.textContent = row.dataset.type || "-";
      refs.invoice.textContent = row.dataset.invoice || "-";
      refs.status.textContent = row.dataset.status || "-";
      refs.invoiceId.textContent = row.dataset.invoiceId || "-";
      refs.dueDate.textContent = row.dataset.dueDate || "-";
      refs.date.textContent = row.dataset.entryDate || "-";
      refs.itemLabel.textContent = row.dataset.itemLabel || "-";
      refs.itemAmount.textContent = row.dataset.itemAmount || "-";
      refs.discount.textContent = row.dataset.discount || "-";
      refs.tax.textContent = row.dataset.tax || "-";
      refs.adjustment.textContent = row.dataset.adjustment || "-";
      refs.total.textContent = row.dataset.total || "-";
    }

    function setActiveRow(targetRow) {
      rows.forEach((row) => row.classList.remove("active"));
      targetRow.classList.add("active");
      applyRowData(targetRow);
    }

    rows.forEach((row) => {
      row.addEventListener("click", function () {
        setActiveRow(row);
      });
    });

    if (markAsPaidBtn) {
      markAsPaidBtn.addEventListener("click", function () {
        const activeRow = document.querySelector(".payp-row.active");
        if (!activeRow) return;

        activeRow.dataset.status = "Paid";
        refs.status.textContent = "Paid";

        const statusTag = activeRow.querySelector(".payp-status-text");
        if (statusTag) {
          statusTag.className = "payp-status-tag paid payp-status-text";
          statusTag.innerHTML = '<i class="fa-solid fa-circle-check"></i> Paid';
        }
      });
    }
  })();
</script>

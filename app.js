(() => {
  "use strict";
  const site = window.PENNY_SITE;
  if (!site) return;
  const $ = (selector) => document.querySelector(selector);
  const arrow = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16m-7-7 7 7-7 7"/></svg>';
  const external = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6m0-6-10 10M10 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-5"/></svg>';
  const icons = {
    email:'<path d="M3 5h18v14H3zM3 5l9 8 9-8"/>',
    wechat:'<path d="M16 14c3.5 0 6 2.2 6 5 0 1.3-.6 2.4-1.7 3.3l.3 2-2.4-1A7.8 7.8 0 0 1 16 24c-3.5 0-6-2.2-6-5s2.5-5 6-5Z" transform="translate(0 -4)"/><path d="M10 17a9 9 0 0 1-4-.4l-3 1 .5-2.7A6.2 6.2 0 0 1 1 10c0-4 3.9-7 8.5-7 4 0 7.7 2.7 8.3 6M6 8h.1M12 8h.1M14 13h.1M18 13h.1"/>',
    link:'<path d="m9 15 6-6m-5-3 2-2a5 5 0 0 1 7 7l-2 2M14 18l-2 2a5 5 0 0 1-7-7l2-2"/>'
  };
  function node(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }
  function webUrl(value) {
    if (!value) return "";
    try { const parsed = new URL(value); return ["https:", "http:"].includes(parsed.protocol) ? parsed.href : ""; }
    catch { return ""; }
  }
  function externalLink(url, className, label) {
    const link = node("a", className, label);
    link.href = url; link.target = "_blank"; link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", label + "，在新标签页打开"); return link;
  }
  function recordingSection(recordings, emptyNote) {
    const block = node("div", "recordings"); block.append(node("h4", "", "使用方法录播"));
    const valid = (recordings || []).filter(item => webUrl(item.url));
    if (!valid.length) block.append(node("p", "", emptyNote || "录播列表与访问入口待补充。"));
    else {
      const list = node("ul");
      valid.forEach(item => { const li = node("li"); li.append(externalLink(webUrl(item.url), "text-link", item.title)); list.append(li); });
      block.append(list);
    }
    return block;
  }
  const dialog = $("#information-dialog");
  let previousFocus;
  function inform(title, message) {
    previousFocus = document.activeElement;
    $("#dialog-title").textContent = title; $("#dialog-message").textContent = message;
    if (!dialog.open) dialog.showModal();
  }
  function closeDialog() { dialog.close(); }
  $("#dialog-close").addEventListener("click", closeDialog);
  $("#dialog-ok").addEventListener("click", closeDialog);
  dialog.addEventListener("close", () => { if (previousFocus?.isConnected) previousFocus.focus(); });
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) closeDialog();
  });

  const aboutText = $("#about-text");
  if (aboutText) {
    aboutText.replaceChildren();
    site.about.forEach((text, i) => aboutText.append(node("p", i === site.about.length - 1 && text.includes("待补充") ? "pending-copy" : "", text)));
    $("#about-role").textContent = site.aboutRole;
    $("#about-motto").textContent = site.aboutMotto;
  }

  if ($("#resource-list")) {
  function renderResources(resources, resourceList, startIndex) {
  resources.forEach((resource, i) => {
    const li = node("li"); const url = webUrl(resource.url);
    if (resource.hasRecordings) {
      const details = node("details", "resource-item"); details.id = "resource-skills";
      const summary = node("summary", "resource-row");
      summary.append(node("span", "row-number", String(startIndex + i + 1).padStart(2, "0")));
      const copy = node("span"); copy.append(node("span", "row-title", resource.title), node("span", "row-description", resource.description));
      const icon = node("span", "resource-arrow"); icon.innerHTML = arrow; summary.append(copy, icon); details.append(summary);
      const body = node("div", "resource-details");
      if (resource.details && resource.details.length) {
        const detailList = node("ul", "resource-detail-list");
        resource.details.forEach(item => {
          const detailItem = node("li");
          if (item.status) detailItem.className = "is-pending";
          const info = node("span");
          info.append(node("span", "", item.description));
          if (item.status) info.append(node("span", "status-tag", item.status));
          detailItem.append(node("strong", "", item.title), info);
          detailList.append(detailItem);
        });
        body.append(detailList);
      }
      if (url) body.append(externalLink(url, "text-link", "打开 Skill 合集"));
      else if (resource.note) String(resource.note).split("\n").forEach(line => body.append(node("p", "resource-note", line)));
      else body.append(node("p", "", "Skill 合集目录与资料入口待补充。"));
      body.append(recordingSection(resource.recordings, resource.recordingsNote)); details.append(body); li.append(details); resourceList.append(li); return;
    }
    const internalId = resource.courseId && site.courses.some(c => c.id === resource.courseId) ? resource.courseId : "";
    const row = url ? externalLink(url, "resource-row", resource.title) : node(internalId ? "a" : "button", "resource-row");
    if (internalId && !url) {
      row.href = "#" + internalId;
      row.addEventListener("click", () => {
        const target = document.getElementById(internalId);
        if (target) target.open = true;
      });
    }
    if (!url && !internalId) {
      row.type = "button"; row.setAttribute("aria-label", resource.title + "，查看资源状态");
      row.addEventListener("click", () => inform(resource.title, resource.note ? String(resource.note).replace(/\n/g, " ") : "产品介绍与访问入口待补充。\n补充后即可从这里查看资料或前往产品入口。"));
    }
    row.replaceChildren(node("span", "row-number", String(startIndex + i + 1).padStart(2, "0")));
    const copy = node("span");
    copy.append(node("span", "row-title", resource.title), node("span", "row-description", resource.description));
    const icon = node("span", "resource-arrow"); icon.innerHTML = arrow;
    row.append(copy, icon); li.append(row); resourceList.append(li);
  });
  }
  let resourceIndex = 0;
  const allResources = [];
  (site.resourceGroups || []).forEach((group, i) => {
    const block = node("div", "resource-group");
    const title = node("h3", "resource-group-title", group.title);
    title.id = group.id || "resource-group-" + i;
    const list = node("ul", "resource-list"); list.setAttribute("aria-labelledby", title.id);
    block.append(title, list); $("#resource-groups").append(block);
    renderResources(group.items, list, resourceIndex);
    resourceIndex += group.items.length; allResources.push(...group.items);
  });
  renderResources(site.resources || [], $("#resource-list"), resourceIndex);
  allResources.push(...(site.resources || []));
  if (allResources.some(item => webUrl(item.url))) $("#resource-status").textContent = "教学资源入口";
  else if (allResources.every(item => item.note)) $("#resource-status").textContent = "付费资料 · 购买后交付";
  }

  const courseList = $("#course-list");
  if ($("#planned-resources")) {
    if (site.plannedResources?.length) $("#planned-resources").textContent = site.plannedResources.join(" · ");
    else $(".future-products").hidden = true;
  }
  if (courseList) {
  site.courses.forEach((course, i) => {
    const li = node("li"); const details = node("details", "course-item");
    if (course.id) details.id = course.id;
    const summary = node("summary", "course-summary");
    summary.append(node("span", "course-number", String(i + 1).padStart(2, "0")));
    const copy = node("span"); const titleLine = node("span", "course-title-line");
    titleLine.append(node("span", "course-title", course.title));
    if (course.example) titleLine.append(node("span", "example-label", "示例课程"));
    if (course.status) titleLine.append(node("span", "example-label", course.status));
    copy.append(titleLine, node("span", "course-description", course.description));
    if (course.meta && course.meta.length) {
      const metaRow = node("span", "course-meta");
      course.meta.forEach(text => metaRow.append(node("span", "meta-chip", text)));
      copy.append(metaRow);
    }
    const control = node("span", "outline-control");
    const closedLabel = "查看介绍";
    const openLabel = "收起介绍";
    const controlLabel = node("span", "", closedLabel);
    control.append(controlLabel); const icon = node("span"); icon.innerHTML = arrow; control.append(icon);
    summary.append(copy, control); details.append(summary);
    const outline = node("div", "course-outline");
    if (course.example) outline.append(node("p", "outline-note", "示例大纲 · 正式课程内容待确认"));
    if (course.outlineHeading) outline.append(node("h3", "outline-heading", course.outlineHeading));
    const topics = node("ul");
    (course.outline || []).forEach(topic => topics.append(node("li", "", topic)));
    outline.append(topics); details.append(outline);
    if (course.hasRecordings) {
      outline.append(recordingSection(course.recordings));
    }
    details.addEventListener("toggle", () => { controlLabel.textContent = details.open ? openLabel : closedLabel; });
    li.append(details); courseList.append(li);
  });
  }

  if ($("#member-login")) {
    const form = $("#member-login"); const gate = $("#member-gate"); const content = $("#member-content");
    const phone = $("#member-phone"); const feedback = $("#member-error");
    const submit = $("#member-submit"); const publicDescription = $("#member-description").textContent;
    $("#member-title").textContent = site.membership.title;
    if (site.membership.price && !$("#member-price")) {
      const priceLine = node("p", "member-price", "会员年费 " + site.membership.price);
      priceLine.id = "member-price";
      $("#member-title").after(priceLine);
    }
    function showGate(message = "") {
      content.hidden = true; gate.hidden = false; $("#member-benefits").replaceChildren();
      $("#member-description").textContent = publicDescription;
      feedback.textContent = message; feedback.hidden = !message;
    }
    async function showMemberContent() {
      const response = await fetch("/api/member/content", { credentials:"same-origin", cache:"no-store" });
      if (!response.ok) { showGate("验证已失效，请重新输入会员手机号。"); return; }
      const member = await response.json();
      $("#member-benefits").replaceChildren();
      member.benefits.forEach((benefit, i) => {
        const li = node("li", "benefit-row"); li.append(node("span", "course-number", String(i + 1).padStart(2, "0")));
        const copy = node("div"); copy.append(node("h2", "benefit-title", benefit.title), node("p", "benefit-description", benefit.description));
        li.append(copy); $("#member-benefits").append(li);
      });
      $("#member-description").textContent = member.description;
      feedback.hidden = true; gate.hidden = true; content.hidden = false;
    }
    form.addEventListener("submit", async event => {
      event.preventDefault();
      if (!phone.value.trim()) { feedback.textContent = "请填写会员手机号。"; feedback.hidden = false; return; }
      submit.disabled = true; submit.textContent = "正在验证…"; feedback.hidden = true;
      try {
        const response = await fetch("/api/member/login", { method:"POST", credentials:"same-origin", headers:{"Content-Type":"application/json"}, body:JSON.stringify({phone:phone.value}) });
        const result = await response.json();
        if (!response.ok) { feedback.textContent = result.message || "验证未通过，请检查后重试。"; feedback.hidden = false; phone.setAttribute("aria-invalid", "true"); }
        else { phone.removeAttribute("aria-invalid"); await showMemberContent(); }
      } catch { feedback.textContent = "暂时无法验证，请稍后重试或联系 Penny。"; feedback.hidden = false; }
      finally { submit.disabled = false; submit.textContent = "验证并进入"; }
    });
    $("#member-logout").addEventListener("click", async () => {
      try {
        const response = await fetch("/api/member/logout", {method:"POST",credentials:"same-origin"});
        if (!response.ok) throw new Error("logout failed");
        showGate(); phone.value = ""; phone.focus();
      } catch { inform("暂时无法退出", "请稍后重试。"); }
    });
    async function refreshSession() {
      try {
        const response = await fetch("/api/member/session", {credentials:"same-origin",cache:"no-store"});
        const session = await response.json();
        if (session.authenticated) await showMemberContent(); else showGate();
      } catch { showGate("暂时无法验证，请稍后重试或联系 Penny。"); }
    }
    refreshSession();
    window.addEventListener("pageshow", event => { if (event.persisted) { showGate(); refreshSession(); } });
  }

  if ($("#recharge-link-slot")) {
  const decodeB64 = (v) => { try { return v ? atob(v) : ""; } catch { return ""; } };
  const rechargeUrl = webUrl(site.rechargeUrl) || webUrl(decodeB64(site.rechargeUrlB64));
  const privateMode = !rechargeUrl && !!site.rechargeNote;
  const rechargeLabel = privateMode ? "微信获取充值入口" : "前往充值入口";
  const rechargeButton = rechargeUrl ? externalLink(rechargeUrl, "button recharge-button", rechargeLabel) : node("button", "button recharge-button", rechargeLabel);
  if (!rechargeUrl) {
    rechargeButton.type = "button";
    rechargeButton.addEventListener("click", () => inform(privateMode ? "AI 加油充值" : "充值入口待补充", privateMode ? String(site.rechargeNote).replace(/\n/g, " ") : "AI 加油充值是第三方平台的链接入口。\n入口网址待提供，补充后会在新标签页打开。"));
  } else $("#recharge-status").textContent = "前往第三方平台 · 在新标签页打开";
  if (privateMode) { const statusEl = $("#recharge-status"); if (statusEl) statusEl.textContent = "由 Penny 私信发送 · 不在页面公开"; }
  if (rechargeUrl) { const rechargeIcon = node("span"); rechargeIcon.innerHTML = external; rechargeButton.append(rechargeIcon); }
  $("#recharge-link-slot").append(rechargeButton);
  }

  if ($("#contact-list")) {
  const contact = site.contact || {};
  const channels = [
    { name:"电子邮箱", value:contact.email || "邮箱待补充", icon:"email", type:"email" },
    ...(contact.qqEmail ? [{ name:"QQ 邮箱", value:contact.qqEmail, icon:"email", type:"qqEmail" }] : []),
    { name:"微信", value:contact.wechat || "微信待补充", icon:"wechat", type:"wechat" },
    ...(webUrl(contact.otherUrl) ? [{ name:"其他联系渠道", value:"前往联系入口", icon:"link", type:"otherUrl" }] : [])
  ];
  channels.forEach(channel => {
    const li = node("li"); const emailValid = ["email", "qqEmail"].includes(channel.type) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact[channel.type] || "");
    let row;
    if (emailValid) { row = node("a", "contact-row"); row.href = "mailto:" + contact[channel.type]; }
    else if (channel.type === "otherUrl" && webUrl(contact.otherUrl)) row = externalLink(webUrl(contact.otherUrl), "contact-row", channel.name);
    else {
      row = node("button", "contact-row"); row.type = "button";
      row.addEventListener("click", () => inform(channel.name, channel.type === "wechat" && contact.wechat ? "微信号：" + contact.wechat + "\n在微信中搜索此微信号，即可添加联系。" : contact[channel.type] || "联系方式待补充，更新后即可从这里联系 Penny。"));
    }
    const icon = node("span", "contact-icon");
    icon.innerHTML = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">' + icons[channel.icon] + '</svg>';
    const text = node("span"); text.append(node("span", "contact-name", channel.name), node("span", "contact-value", channel.value));
    row.append(icon, text); li.append(row); $("#contact-list").append(li);
  });
  }

  const menu = $(".menu-toggle"); const nav = $("#main-nav");
  function setMenu(open) {
    menu.setAttribute("aria-expanded", String(open)); menu.setAttribute("aria-label", open ? "关闭导航菜单" : "打开导航菜单");
    nav.classList.toggle("is-open", open);
  }
  menu.addEventListener("click", () => setMenu(menu.getAttribute("aria-expanded") !== "true"));
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => { setMenu(false); selectNav(link.hash.slice(1)); }));
  document.addEventListener("keydown", event => { if (event.key === "Escape") setMenu(false); });
  document.addEventListener("click", event => { if (!event.target.closest(".site-header")) setMenu(false); });
  const navLinks = [...nav.querySelectorAll("a")];
  function selectNav(id) {
    navLinks.forEach(link => {
      if (link.hash === "#" + id && id) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) selectNav(entry.target.id); });
    }, { rootMargin:"-12% 0px -64% 0px", threshold:0 });
    document.querySelectorAll("main>section").forEach(section => observer.observe(section));
  }
})();

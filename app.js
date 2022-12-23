class ImagePartial extends HTMLElement {
  constructor() {
    super();

    // Create a shadow root for the image partial
    this.attachShadow({ mode: "open" });

    // Create a template element for the component
    const template = document.createElement("template");
    template.innerHTML = `
        <style>
          img {
            max-width: 100%;
          }
        </style>
        <figure class="image-partial">
          <picture>
            <!-- Add different sources for the image depending on the device type -->
            <source srcset="${
              this.imageSrcDesktop
            }" media="(min-width: 1024px)" type="image/webp">
            <source srcset="${
              this.imageSrcTablet || this.imageSrcDesktop
            }" media="(min-width: 768px) and (max-width: 1023px)" type="image/webp">
            <source srcset="${
              this.imageSrcMobile || this.imageSrcDesktop
            }" media="(max-width: 767px)" type="image/webp">
            <img
              src="${this.imageSrc || this.imageSrcDesktop}"
              ${this.imageAlt && `alt="${this.imageAlt}"`}
              ${this.imageTitle && `title="${this.imageTitle}"`}
              ${this.lazyLoading ? 'loading="lazy"' : ""}
              >
          </picture>
          ${
            this.imageCaption && `<figcaption>${this.imageCaption}</figcaption>`
          }
        </figure>
      `;

    // Clone the template and add it to the shadow root
    const instance = template.content.cloneNode(true);
    this.shadowRoot.appendChild(instance);
  }

  // Getter and setter methods for the image src, alt, title, lazy-loading and caption properties
  get imageSrc() {
    return this.getAttribute("src");
  }

  set imageSrc(value) {
    this.setAttribute("src", value);
  }

  get imageTitle() {
    return this.getAttribute("title") || "";
  }

  set imageTitle(value) {
    this.setAttribute("title", value);
  }

  get imageAlt() {
    return this.getAttribute("alt") || "";
  }

  set imageAlt(value) {
    this.setAttribute("alt", value);
  }

  get lazyLoading() {
    return this.getAttribute("lazy-loading");
  }

  set lazyLoading(value) {
    this.setAttribute("lazy-loading", value);
  }

  get imageCaption() {
    return this.getAttribute("caption") || "";
  }

  set imageCaption(value) {
    this.setAttribute("caption", value);
  }

  // Getters and setters for the different image sources depending on the device type
  get imageSrcDesktop() {
    return this.getAttribute("src-desktop");
  }

  set imageSrcDesktop(value) {
    this.setAttribute("src-desktop", value);
  }

  get imageSrcTablet() {
    return this.getAttribute("src-tablet");
  }

  set imageSrcTablet(value) {
    this.setAttribute("src-tablet", value);
  }

  get imageSrcMobile() {
    return this.getAttribute("src-mobile");
  }

  set imageSrcMobile(value) {
    this.setAttribute("src-mobile", value);
  }
}

customElements.define("image-partial", ImagePartial);

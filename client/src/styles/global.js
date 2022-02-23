import { Global, css } from "@emotion/react";

const style = css`
  :root {
    --point-color: #2ac1bc;
  }
  /* Preferred box-sizing value */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  *:where(:not(iframe, canvas, img, svg, video):not(svg *, symbol *)) {
    all: unset;
    display: revert;
  }

  a {
    text-decoration: none;
  }

  /* Remove list styles (bullets/numbers) */
  ol,
  ul,
  menu {
    list-style: none;
  }

  /* For images to not be able to exceed their container */
  img {
    max-width: 100%;
  }

  /* removes spacing between cells in tables */
  table {
    border-collapse: collapse;
  }

  /* revert the 'white-space' property for textarea elements on Safari */
  textarea {
    white-space: revert;
  }

  /* fix the feature of 'hidden' attribute.
 display:revert; revert to element instead of attribute */
  :where([hidden]) {
    display: none;
  }

  /* revert for bug in Chromium browsers
 - fix for the content editable attribute will work properly. */
  :where([contenteditable]) {
    -moz-user-modify: read-write;
    -webkit-user-modify: read-write;
    overflow-wrap: break-word;
    -webkit-line-break: after-white-space;
  }

  /* apply back the draggable feature - exist only in Chromium and Safari */
  :where([draggable="true"]) {
    -webkit-user-drag: element;
  }

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  .flex {
    display: flex;
  }

  .flex-col {
    display: flex;
    flex-direction: column;
  }

  .justify-start {
    justify-content: start;
  }

  .justify-end {
    justify-content: end;
  }
  .justify-center {
    justify-content: center;
  }

  .justify-between {
    justify-content: space-between;
  }

  .justify-around {
    justify-content: space-around;
  }

  .justify-evenly {
    justify-content: space-evenly;
  }

  .items-center {
    align-items: center;
  }

  .self-start {
    align-self: flex-start;
  }

  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .flex-col-center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .gap-5 {
    gap: 5px;
  }

  .gap-10 {
    gap: 10px;
  }

  .gap-15 {
    gap: 15px;
  }

  .w-144 {
    width: 144px;
  }

  .w-280 {
    width: 280px;
  }

  .w-480 {
    width: 480px;
  }

  .w-520 {
    width: 520;
  }

  .h-144 {
    height: 144px;
  }

  .h-280 {
    height: 280px;
  }

  .h-480 {
    height: 480px;
  }

  .h-520 {
    height: 520px;
  }

  .p-5 {
    padding: 5px;
  }

  .p-10 {
    padding: 10px;
  }

  .p-20 {
    padding: 20px;
  }

  .px-10 {
    padding: 10px 0;
  }

  .px-20 {
    padding: 20px 0;
  }

  .py-10 {
    padding: 0 10px;
  }

  .py-20 {
    padding: 0 20px;
  }

  .mt-10 {
    margin-top: 10px;
  }

  .mt-20 {
    margin-top: 20px;
  }

  .mt-30 {
    margin-top: 30px;
  }

  .mt-40 {
    margin-top: 40px;
  }

  .mb-10 {
    margin-bottom: 10px;
  }

  .mb-20 {
    margin-bottom: 20px;
  }

  .my-10 {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .my-20 {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .mx-10 {
    margin-left: 10px;
    margin-right: 10px;
  }

  .mx-20 {
    margin-left: 20px;
    margin-right: 20px;
  }
`;

const GlobalStyle = () => {
  return <Global styles={style} />;
};

export default GlobalStyle;

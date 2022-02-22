import styled from "styled-components";

const Wrapper = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 3vh;
`;

const Container = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.size.maxWidth};
  position: relative;

  .title {
    text-align: center;
    position: relative;
    font-weight: 700;
    font-size: 2rem;
    letter-spacing: -0.5px;
    padding: 2vh;

    &::after {
      content: "";
      position: absolute;
      width: 99%;
      bottom: 0;
      left: 0;
      border: 1px solid #333;
    }
  }

  .cart-list-section {
    display: flex;
    padding: 2rem 2rem 0;
    justify-content: center;
    flex-direction: row;

    @media screen and (max-width: ${({ theme }) => theme.device.mobile}) {
      flex-direction: column;
    }
  }

  .cart-list-item-area {
    flex: 1;
    margin-right: 4vh;

    .cart-list-select-group {
      display: flex;
      justify-content: space-between;

      .select-box {
        display: flex;
        align-items: center;

        input {
          margin-right: 0.5rem;
          width: 28px;
          height: 28px;
        }
      }

      .delete-button {
        background-color: white;
        border: 1px solid #bbb;
        box-sizing: border-box;
        font-size: 1rem;
        text-align: center;
        color: #333;
        padding: 0.5rem 1rem;
      }
    }
    .cart-list-item-group {
      margin-top: 2rem;

      .subtitle {
        padding-bottom: 1rem;
        font-weight: 400;
        font-size: 1.25rem;
        border-bottom: 1px solid #aaa;
      }

      .cart-list-item-list {
        .item-list {
          height: 15vh;
          display: flex;
          padding: 1rem 0.5rem;

          & + .item-list {
            border-top: 1px solid #aaa;
          }

          input {
            width: 28px;
            height: 28px;
            margin-right: 1rem;
          }

          .item-info {
            display: flex;
            .img-container {
              flex: 2;
              margin-right: 1rem;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .item-title {
              flex: 3;
            }
          }
          .item-control {
            flex: 1;
            flex-shrink: 0;
            text-align: right;
            display: flex;
            flex-direction: column;

            * {
              flex: 1;
              float: right;
            }

            .price {
              text-align: right;
              font-size: 1rem;
              letter-spacing: -0.5px;
              color: #333;
            }
          }
        }
      }
    }
  }

  .cart-list-price-area {
    flex: 1;
    padding: 2rem 1rem;

    .price-table {
      border: 1px solid #ddd;
      box-sizing: border-box;

      .price-table-head {
        padding: 2vw;
        font-size: 1.5rem;
        letter-spacing: -0.5px;
        border-bottom: 3px solid #ddd;
      }

      .price-table-body {
        padding: 2vw 1vw;

        .sub-title {
          display: flex;
          justify-content: space-between;

          span {
            font-weight: 700;
            font-size: 1.25rem;
            position: relative;
            z-index: 1;

            &::after {
              content: "";
              position: absolute;
              bottom: 0;
              left: 0;
              z-index: -1;
              height: 7px;
              width: 100%;
              background-color: #2ac1bc;
            }
          }
        }

        button {
          width: 100%;
          margin-top: 8vh;
          background-color: #2ac1bc;
          border: none;
          padding: 2rem;
          color: white;
          font-size: 1.5rem;
        }
      }
    }
  }
`;

export { Wrapper, Container };

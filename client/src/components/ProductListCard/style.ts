import styled from "styled-components";

const Wrapper = styled.li`
  flex-shrink: 0;
  width: calc((100% - 3rem) / 4);
  margin-right: 1rem;
  &:nth-child(4n) {
    margin-right: 0;
  }

  @media screen and (max-width: ${({ theme }) => theme.device.tablet}) {
    width: calc((100% - 1rem) / 3);
    margin-right: 0.5rem;
    &:nth-child(4n) {
      margin-right: 0.5rem;
    }
    &:nth-child(3n) {
      margin-right: 0;
    }
  }

  @media screen and (max-width: ${({ theme }) => theme.device.mobile}) {
    width: calc((100% - 0.5rem) / 2);
    margin-right: 0.5rem;
    &:nth-child(4n) {
      margin-right: 0.5rem;
    }
    &:nth-child(3n) {
      margin-right: 0.5rem;
    }
    &:nth-child(2n) {
      margin-right: 0;
    }
  }
`;

const Container = styled.div`
  .product-image-area {
    position: relative;
    z-index: 0;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      &:hover {
        transform: scale(1.1);
      }
    }
  }

  .product-info-area {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
  }

  .product-desc-group {
    line-height: 1.5;
    overflow: hidden;

    .item-name {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      width: 100%;
      font-weight: 400;
      font-size: 1rem;
      color: #333;
    }

    .item-price {
      font-size: 1.25rem;
      color: #333;
    }
  }

  .product-logo-group {
    margin-left: 1rem;
    width: 30px;
    height: 30px;
  }
`;

export { Wrapper, Container };

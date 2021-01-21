# boiler-plate

#20강

[react-router](https://reactrouter.com/web/guides/quick-start) 참고

[basic](https://reactrouter.com/web/example/basic) 참고

```jsx
<Route exact path="/">
  <LandingPage />
</Route>
```

위 처럼 쓴 것을 아래처럼 바꿀 수 있다.

```jsx
<Route exact path="/" component={LandingPage} />
```

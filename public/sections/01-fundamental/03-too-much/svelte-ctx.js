// Svelte Generated
function create_fragment(ctx) {
    // ...
	return {
		c() {
			div = element("div");
			t0 = text(/*h*/ ctx[0]);
			t1 = text(":");
			t2 = text(/*m*/ ctx[1]);
			t3 = text(":");
			t4 = text(/*s*/ ctx[2]);
		},
        // ...
		p(ctx, [dirty]) {
			if (dirty & /*h*/ 1) set_data(t0, /*h*/ ctx[0]);
			if (dirty & /*m*/ 2) set_data(t2, /*m*/ ctx[1]);
			if (dirty & /*s*/ 4) set_data(t4, /*s*/ ctx[2]);
		},
        // ...
	};
}

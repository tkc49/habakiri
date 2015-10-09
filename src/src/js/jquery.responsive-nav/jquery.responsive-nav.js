/**
 * jquery.responsive-nav
 * Description: レスポンシブなナビゲーションを実装。プルダウンナビ <=> オフキャンバスナビ。要 Genericons
 * Version    : 2.3.0
 * Author     : inc2734
 * Autho URI  : http://2inc.org
 * created    : February 20, 2014
 * modified   : October 9, 2015
 * package    : jquery
 * License    : GPLv2 or later
 * License URI: license.txt
 */
;( function( $ ) {
	$.fn.responsive_nav = function( config ) {
		var config = $.extend( {
			container: $( 'body' ),
			contents : $( '#container' ),
			direction: 'right'
		}, config );

		var resize_timer   = false;
		var container      = config.container;
		var contents       = config.contents;
		var responsive_nav = this;
		
		if ( $( '.off-canvas-nav' ).length < 1 ) {
			var offcanvas_nav = responsive_nav.clone( true );
		} else {
			var offcanvas_nav = $( '.off-canvas-nav' );
		}

		return this.each( function( i, e ) {
			container.addClass( 'responsive-nav-wrapper' );
			if ( config.direction === 'left' ) {
				container.addClass( 'off-canvas-nav-left' );
			} else {
				container.addClass( 'off-canvas-nav-right' );
			}
			contents.addClass( 'responsive-nav-contents' );
			offcanvas_nav.addClass( 'off-canvas-nav' );

			container.prepend( offcanvas_nav );
			responsive_nav.addClass( 'responsive-nav' );

			init();

			var menu = $( this ).find( 'ul:first-child' );
			menu.children( 'li' ).children( 'ul' ).children( 'li' ).hover( function() {
				var children = $( this ).children( 'ul' );
				if ( children.length ) {
					if ( $( window ).width() < ( children.width() + children.offset().left ) ) {
						children.addClass( 'reverse-pulldown' );
						children.find( 'ul' ).addClass( 'reverse-pulldown' );
					}
				}
			} );

			$( window ).resize( function() {
				nav_close();
				if ( resize_timer !== false ) {
					clearTimeout( resize_timer );
				}
				resize_timer = setTimeout( function() {
					var children = menu.children( 'li' ).children( 'ul' ).children( 'li' );
					children.removeClass( 'reverse-pulldown' );
					children.find( 'ul' ).removeClass( 'reverse-pulldown' );
					init();
				}, 300 );
			} );

			$( '#responsive-btn' ).on( 'click', function( e ) {
				if ( container.hasClass( 'off-canvas-nav-open' ) ) {
					nav_close();
				} else {
					nav_open();
				}
				e.stopPropagation();
			} );

			$( document ).on( 'click', function( e ) {
				var contain_btn = $( '#responsive-btn' ).get( 0 );
				var contain_nav = offcanvas_nav.get( 0 );
				var contained   = e.target;
				if ( contain_btn != contained && !$.contains( contain_nav, contained ) && contain_nav != contained ) {
					if ( container.hasClass( 'off-canvas-nav-open' ) ) {
						nav_close();
					}
				}
			} );
		} );

		function init() {
			nav_close();
		}

		function nav_open() {
			offcanvas_nav.css( 'visibility', 'visible' );
			container.addClass( 'off-canvas-nav-open' );

			if ( is_ios() ) {
				$( 'html' ).addClass( 'open-for-ios' );
			}
		}

		function nav_close() {
			container.removeClass( 'off-canvas-nav-open' );

			container.removeClass( 'open-for-ios' );
			$( 'html' ).removeClass( 'open-for-ios' );
		}

		function is_iphone () {
			var _ret = false;
			if ( navigator.userAgent.match( /iPhone/i ) ) {
				_ret = true;
			}
			return _ret;
		}
		function is_ipad () {
			var _ret = false;
			if ( navigator.userAgent.match( /iPad/i ) ) {
				_ret = true;
			}
			return _ret;
		}
		function is_ipod () {
			var _ret = false;
			if ( navigator.userAgent.match( /iPod/i ) ) {
				_ret = true;
			}
			return _ret;
		}
		function is_ios () {
			var _ret = false;
			if ( is_iphone() || is_ipad() || is_ipod() ) {
				_ret = true;
			}
			return _ret;
		}
	}
} )( jQuery );

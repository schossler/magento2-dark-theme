/**
 * Obsidian Dark Theme — theme.js
 * Melhorias de UX para o tema escuro
 */
define(['jquery', 'domReady!'], function ($) {
    'use strict';

    // -------------------------------------------------------------------------
    // Adiciona classe ao html para transições suaves ao carregar
    // -------------------------------------------------------------------------
    $('html').addClass('obsidian-loaded');

    // -------------------------------------------------------------------------
    // Scroll: header com sombra aumentada ao rolar
    // -------------------------------------------------------------------------
    var $header = $('.page-header');
    $(window).on('scroll.obsidian', function () {
        if ($(this).scrollTop() > 10) {
            $header.addClass('scrolled');
        } else {
            $header.removeClass('scrolled');
        }
    });

    // -------------------------------------------------------------------------
    // Animação de entrada nos product cards (Intersection Observer)
    // -------------------------------------------------------------------------
    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    $(entry.target).addClass('obsidian-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        $('.product-item').each(function () {
            observer.observe(this);
        });
    } else {
        // Fallback sem suporte ao IntersectionObserver
        $('.product-item').addClass('obsidian-visible');
    }

    // -------------------------------------------------------------------------
    // Feedback visual ao adicionar ao carrinho
    // -------------------------------------------------------------------------
    $(document).on('ajax:addToCart', function (event, data) {
        if (data && data.productId) {
            var $btn = $('[data-product-id="' + data.productId + '"] .action.tocart');
            $btn.addClass('obsidian-added');
            setTimeout(function () {
                $btn.removeClass('obsidian-added');
            }, 1800);
        }
    });

    // -------------------------------------------------------------------------
    // Suaviza a abertura dos filtros no mobile
    // -------------------------------------------------------------------------
    $(document).on('click', '.filter-options-title', function () {
        $(this).closest('.filter-options-item').toggleClass('obsidian-open');
    });
});

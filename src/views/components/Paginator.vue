<template lang="pug">
    .pagination-group.form-inline
        .form-group
            label {{ $t('components.pagination.display_result') }}
            select.form-control(v-model="itemsPerPage" @change="onItemsPerPageChanged" :disabled="disabled")
                option(v-for="size in itemsPerPageList" :value="size") {{size}}
        ul.pagination
            li.page-item(:class="atFirst ? 'first disabled' : 'first'")
                a.page-link(:class="{disabled: disabled}" @click.prevent="onPageClicked(first)" :title="'First page (' + first + ')'" href="#") «
            li.page-item.page-report
                a.page-link
                    span.page-item-report
                        formatted-number(:number="startOrder" :type="'int'")
                        | &nbsp;-&nbsp;
                        formatted-number(:number="endOrder" :type="'int'")
                        | &nbsp;/&nbsp;
                    formatted-number(:number="totalItems" :type="'int'")
            li.page-item(:class="atFirst ? 'prev disabled' : 'prev'")
                a.page-link(:class="{disabled: disabled}" @click.prevent="onPageClicked(prev)" :title="'Previous page (' + prev + ')'" href="#") ‹
            li.page-item.page-item-direct(v-for="i in (end - start + 1)" :class="current == start - 1 + i ? 'page active' : 'page'")
                a.page-link(:class="{disabled: disabled}" @click.prevent="onPageClicked(start - 1 + i)" :title="'Page ' + (start - 1 + i).toString()" href="#")
                    | {{ start - 1 + i }}
            li.page-item(:class="atLast ? 'next disabled' : 'next'")
                a.page-link(:class="{disabled: disabled}" @click.prevent="onPageClicked(next)" :title="'Next page (' + next + ')'" href="#") ›
            li.page-item(:class="atLast ? 'last disabled' : 'last'")
                a.page-link(:class="{disabled: disabled}" @click.prevent="onPageClicked(last)" :title="'Last page (' + last + ')'" href="#") »
</template>

<script>
    import FormattedNumber from './FormattedNumber'
    import {ITEMS_PER_PAGE_LIST} from '../../app/config'
    import {Paginator} from '@dsquare-gbu/vue-utils'

    export default {
        name: 'Paginator',
        components: {FormattedNumber},
        props: {
            disabled: Boolean,
            paginator: Paginator,
        },
        data() {
            return {
                itemsPerPage: this.paginator.pagination.items_per_page,
                itemsPerPageList: ITEMS_PER_PAGE_LIST,
            }
        },
        computed: {
            totalItems() {
                return this.paginator.pagination.total_items
            },
            current() {
                return this.paginator.pagination.current
            },
            start() {
                return this.paginator.pagination.range ? this.paginator.pagination.range.start : 0
            },
            end() {
                return this.paginator.pagination.range ? this.paginator.pagination.range.end : 0
            },
            first() {
                return this.paginator.pagination.first
            },
            last() {
                return this.paginator.pagination.last
            },
            prev() {
                return this.paginator.pagination.prev
            },
            next() {
                return this.paginator.pagination.next
            },
            atFirst() {
                return this.paginator.pagination.at_first
            },
            atLast() {
                return this.paginator.pagination.at_last
            },
            startOrder() {
                return this.paginator.pagination.total_items ? this.paginator.pagination.start_order + 1 : 0
            },
            endOrder() {
                let lastOrder = this.paginator.pagination.start_order + this.paginator.pagination.items_per_page
                return lastOrder > this.paginator.pagination.total_items ? this.paginator.pagination.total_items : lastOrder
            },
        },
        methods: {
            onPageClicked(page) {
                if (this.disabled) return
                this.paginator.setPage(page)
                this.pageChanged()
            },
            onItemsPerPageChanged() {
                if (this.disabled) return
                this.paginator.setItemsPerPage(this.itemsPerPage)
                this.pageChanged()
            },
            pageChanged() {
                this.$emit('pageChanged', this.paginator.pagination.current, this.paginator.pagination.items_per_page)
            },
        },
    }
</script>

<style lang="scss" scoped>
    .pagination-group {
        float: right;

        .form-group {
            margin-top: 0;
            margin-bottom: 1rem;
            margin-right: 1rem;

            label {
                margin-right: .5rem;
            }
        }
    }

    .page-item {
        &.active {
            .page-link {
                z-index: 0;
            }
        }
    }

    @media (max-width: 575px) {
        .pagination-group {
            float: none;

            .form-group {
                margin-right: 0;

                .form-control {
                    display: inline-block;
                    width: auto;
                    vertical-align: middle;
                }
            }
        }

        .pagination {
            width: 100%;

            .page-report {
                display: none;
            }
        }
    }
</style>

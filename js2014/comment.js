        $.fn.CommentEditor = function(options) {

                var OPT;

                OPT = $.extend({
                        //url: "{exp:comment:ajax_edit_url}",
                        url: "http://glavstroy365.ru/?ACT=4",
                        comment_body: '.comment_body',
                        showEditor: '.edit_link',
                        hideEditor: '.cancel_edit',
                        saveComment: '.submit_edit',
                        closeComment: '.mod_link'
                }, options);

                var view_elements = [OPT.comment_body, OPT.showEditor, OPT.closeComment].join(','),
                        edit_elements = '.editCommentBox',
                        hash = '{XID_HASH}';

                return this.each(function() {
                        var id = this.id.replace('comment_', ''),
                        parent = $(this);

                        parent.find(OPT.showEditor).click(function() { showEditor(id); return false; });
                        parent.find(OPT.hideEditor).click(function() { hideEditor(id); return false; });
                        parent.find(OPT.saveComment).click(function() { saveComment(id); return false; });
                        parent.find(OPT.closeComment).click(function() { closeComment(id); return false; });
                });

                function showEditor(id) {
                        $("#comment_"+id)
                                .find(view_elements).hide().end()
                                .find(".edit_link").show().end()
                                .find(".mod_link").show().end()
                                .find(edit_elements).show().end();
                }

                function hideEditor(id) {
                        $("#comment_"+id)
                                .find(view_elements).show().end()
                                .find(edit_elements).hide();
                }

                function closeComment(id) {
                        var data = {status: "close", comment_id: id, XID: hash};

                        $.post(OPT.url, data, function (res) {
                                if (res.error) {
                                        return $.error('Нет возможности модерирования.');
                                }

                                hash = res.XID;
                                $('input[name=XID]').val(hash);
                                $('#comment_' + id).hide();
                   });
                }

                function saveComment(id) {
                        var content = $("#comment_"+id).find('.editCommentBox'+' textarea').val(),
                                data = {comment: content, comment_id: id, XID: hash};

                $.post(OPT.url, data, function (res) {
                                if (res.error) {
                                        return $.error('Не могу сохранить');
                                }

                                hash = res.XID;
                                $('input[name=XID]').val(hash);
                                $("#comment_"+id).find('.comment_body').html(res.comment);
                                hideEditor(id);
                        });
                }
        };


        $(function() { $('.comment').CommentEditor(); });
